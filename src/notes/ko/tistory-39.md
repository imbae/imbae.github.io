---
title: "시리얼 포트 열기"
date: 2017-12-11
summary: "C# 시리얼 포트 열기 예제"
tags: ["C#", "WPF"]
key: tistory-39
---

C# 시리얼 포트 열기 예제

using System;

using System.Collections.Generic;

using System.ComponentModel;

using System.Data;

using System.Drawing;

using System.Linq;

using System.Text;

using System.Threading.Tasks;

using System.Windows.Forms;

using System.IO.Ports;

namespace mavlink_test

{

public partial class Form1 : Form

{

SerialPort serial_port = new SerialPort();

internal delegate void SerialDataReceivedEventHandlerDelegate(

object sender, SerialDataReceivedEventArgs e);

internal delegate void SerialPinChangedEventHandlerDelegate(

object sender, SerialPinChangedEventArgs e);

delegate void SetTextCallback(string text);

string InputData = String.Empty;

public Form1()

{

InitializeComponent();

serial_port.DataReceived +=

new System.IO.Ports.SerialDataReceivedEventHandler(port_DataReceived_1);

}

private void port_DataReceived_1(object sender, SerialDataReceivedEventArgs e)

{

InputData = serial_port.ReadExisting();

if (InputData != String.Empty)

{

//this.BeginInvoke(new SetTextCallback(SetText), new object[] { InputData });

}

}

private void button1_Click(object sender, EventArgs e)

{

string[] ArrayComPortsNames = null;

int index = -1;

string ComPortName = null;

//Com Ports

ArrayComPortsNames = SerialPort.GetPortNames();

do

{

index += 1;

port_combo.Items.Add(ArrayComPortsNames[index]);

} while (!((ArrayComPortsNames[index] == ComPortName) ||

(index == ArrayComPortsNames.GetUpperBound(0))));

Array.Sort(ArrayComPortsNames);

if (index == ArrayComPortsNames.GetUpperBound(0))

{

ComPortName = ArrayComPortsNames[0];

}

//get first item print in text

port_combo.Text = ArrayComPortsNames[0];

//Baud Rate

baud_combo.Items.Add(57600);

baud_combo.Items.Add(115200);

baud_combo.Items.ToString();

//get first item print in text

baud_combo.Text = baud_combo.Items[0].ToString();

//Data Bits

databit_combo.Items.Add(7);

databit_combo.Items.Add(8);

//get the first item print it in the text

databit_combo.Text = databit_combo.Items[0].ToString();

//Stop Bits

stopbit_combo.Items.Add("One");

stopbit_combo.Items.Add("OnePointFive");

stopbit_combo.Items.Add("Two");

//get the first item print in the text

stopbit_combo.Text = stopbit_combo.Items[0].ToString();

//Parity

parity_combo.Items.Add("None");

parity_combo.Items.Add("Even");

parity_combo.Items.Add("Mark");

parity_combo.Items.Add("Odd");

parity_combo.Items.Add("Space");

//get the first item print in the text

parity_combo.Text = parity_combo.Items[0].ToString();

//Handshake

handshaking_combo.Items.Add("None");

handshaking_combo.Items.Add("XOnXOff");

handshaking_combo.Items.Add("RequestToSend");

handshaking_combo.Items.Add("RequestToSendXOnXOff");

//get the first item print it in the text

handshaking_combo.Text = handshaking_combo.Items[0].ToString();

}

private void open_button_Click(object sender, EventArgs e)

{

serial_port.Open();

serial_port.RtsEnable = true;

serial_port.DtrEnable = true;

}

}

}

[http://www.codeproject.com/Articles/678025/Serial-Comms-in-Csharp-for-Beginners](http://www.codeproject.com/Articles/678025/Serial-Comms-in-Csharp-for-Beginners)

[Serial Comms in C# for Beginners - CodeProjectwww.codeproject.com](http://www.codeproject.com/Articles/678025/Serial-Comms-in-Csharp-for-Beginners)
