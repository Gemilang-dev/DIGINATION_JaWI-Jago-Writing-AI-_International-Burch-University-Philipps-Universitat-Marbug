#!/bin/bash

# Salin file konfigurasi kustom kita ke direktori konfigurasi Nginx yang aktif.
# Setelah ini, biarkan sistem Azure yang memulai Nginx dan PHP-FPM secara normal.
cp /home/site/wwwroot/default /etc/nginx/sites-enabled/default