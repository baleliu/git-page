#!/bin/sh
# 干掉忘记关闭的进程
port=3000;
pid=$(lsof -i tcp:$port |  grep node | head -1 | awk '{print $2}' | awk -F"\\" '{ print $1 }');
if [  -n  "$pid"  ];
    echo "kill -9 $pid"
	then kill  -9  $pid;
fi