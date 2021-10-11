/*
 * Created Date: 2021-10-11 09:21:58
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-10-11 09:22:15
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

package utils

import (
	"fmt"
	"reflect"
)

// PrintAttributes 打印所有属性
func PrintAttributes(it interface{}) {
	value := reflect.ValueOf(it)
	if value.Kind() == reflect.Ptr {
		value = value.Elem()
	}
	for i := 0; i < value.NumField(); i++ {
		fmt.Printf("Field %v: %v\n", value.Type().Field(i).Name, value.Field(i))
	}
}
