/*
 * Created Date: 2021-09-24 08:44:22
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-10-11 09:22:54
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

package utils

import (
	"crypto/tls"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"
	"sync"
)

var (
	GET_METHOD    = "GET"
	POST_METHOD   = "POST"
	SENDTYPE_FORM = "form"
	SENDTYPE_JSON = "json"
)

type HttpClient struct {
	Link     string
	SendType string
	Header   map[string]string
	Body     map[string]string
	sync.RWMutex
}

func NewHttpClient(link string) *HttpClient {
	return &HttpClient{
		Link:     link,
		SendType: SENDTYPE_FORM,
	}
}

func (h *HttpClient) SetHeader(header map[string]string) {
	h.Lock()
	defer h.Unlock()
	h.Header = header
}

func (h *HttpClient) SetBody(body map[string]string) {
	h.Lock()
	defer h.Unlock()
	h.Body = body
}

func (h *HttpClient) SetSendType(sendType string) {
	h.Lock()
	defer h.Unlock()
	h.SendType = sendType
}

func (h *HttpClient) Get() ([]byte, error) {
	return h.send(GET_METHOD)
}

func (h *HttpClient) Post() ([]byte, error) {
	return h.send(POST_METHOD)
}

func GetUrlBuild(link string, data map[string]string) (string, error) {
	u, err := url.Parse(link)
	if err != nil {
		return "", err
	}
	q := u.Query()
	for k, v := range data {
		q.Set(k, v)
	}
	u.RawQuery = q.Encode()
	return u.String(), nil
}

func (h *HttpClient) send(method string) ([]byte, error) {
	var (
		req      *http.Request
		resp     *http.Response
		client   http.Client
		sendData string
		err      error
	)

	if len(h.Body) > 0 {
		if strings.ToLower(h.SendType) == SENDTYPE_JSON {
			sendBody, jsonError := json.Marshal(h.Body)
			if jsonError != nil {
				return nil, jsonError
			}
			sendData = string(sendBody)
		} else {
			sendBody := http.Request{}
			sendBody.ParseForm()
			for k, v := range h.Body {
				sendBody.Form.Add(k, v)
			}
			sendData = sendBody.Form.Encode()
		}
	}

	// 忽略 https 的证书
	client.Transport = &http.Transport{
		TLSClientConfig: &tls.Config{
			InsecureSkipVerify: true,
		},
	}

	req, err = http.NewRequest(method, h.Link, strings.NewReader(sendData))
	if err != nil {
		return nil, err
	}
	defer req.Body.Close()

	// 设置默认 header
	if len(h.Header) > 0 {
		if strings.ToLower(h.SendType) == SENDTYPE_JSON {
			h.Header = map[string]string{
				"Content-Type": "application/json; charset=utf-8",
			}
		} else {
			h.Header = map[string]string{
				"Content-Type": "application/x-www-form-urlencoded",
			}
		}
	}

	for k, v := range h.Header {
		if strings.ToLower(k) == "host" {
			req.Host = v
		} else {
			req.Header.Add(k, v)
		}
	}

	resp, err = client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	defer client.CloseIdleConnections()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("error http code: %d", resp.StatusCode)
	}

	bb, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("get err: %s\n", err)
	}

	return bb, err
}
