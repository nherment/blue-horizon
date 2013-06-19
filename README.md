Blue Horizon
============

USV control code

## PWM
### P9
14, 16
21, 22
29, 31

### P8
13, 19

### i2c-3
100 kHz
SCL (P9 19)
SDA (P9 20)

#### slaves
HMC6343
BMP085

### MODEM
uart1 TX (P9 24) --> Modem RX
uart1 RX (P9 26) --> Modem TX
GPIO3_21 (P9 25) --> Modem DCD

### GPS
uart2 TX (P9 21) --> GPS RX
uart2 RX (P9 22) --> GPS TX
GPIO1_17 (P9 23) --> GPS Energy setting



## P8



LICENSE
=======

MIT License
Copyright (c) 2013 BridgeAnt S.A.S

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

