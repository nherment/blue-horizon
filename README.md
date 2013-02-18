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

Proprietary code

Copyright 2013 BridgeAnt S.A.S
