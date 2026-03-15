VPS Deployment Plan
This plan details the steps required to configure Nginx, set up a landing page, and create a systemd service on the Oracle VPS based on the instructions in 
dominios.md
.

User Review Required
VPS Access: To execute these commands on the VPS, we need an SSH connection or an automated way to execute scripts on the instance. Please confirm the SSH command, user, and IP/hostname to connect to the VPS (e.g., ssh -i path/to/key ubuntu@ip_address).
Cloudflare Origin Certificates: If the certificates do not exist in /etc/ssl/cloudflare/, they must be generated in Cloudflare and created on the server before completing the Nginx setup for HTTPS (since Full (strict) requires them).
Next.js App Deployment path: The systemd service cnsc.service requires the real project path. We need to confirm where the cnsc.profemarlon.com Next.js app is or will be deployed.
Landing page content: I will create a basic landing page for bot.iagent.com.co. If you have a specific HTML design, please provide it.
Proposed Changes
1. Verify Cloudflare Certificates
Run commands to check if origin-cert.pem and origin-key.pem exist in /etc/ssl/cloudflare/.

2. Website Directories and Landing Page
Create directory /var/www/bot.iagent.com.co/html
Set permissions (chown www-data)
Create index.html with a basic landing page.
3. Nginx Configuration
cnsc.profemarlon.com: Create a proxy_pass config pointing to http://127.0.0.1:3000. Redirect HTTP to HTTPS.
bot.iagent.com.co: Create a static site config pointing to /var/www/bot.iagent.com.co/html. Redirect HTTP to HTTPS.
Symlink both sites from sites-available to sites-enabled.
4. Systemd Service
Create /etc/systemd/system/cnsc.service for the Next.js app running on port 3000 in production mode. Enable and start the service.

5. Finalize
Test Nginx config and reload the service. Collect final output logs to share.

Verification Plan
Automated Tests
Run sudo nginx -t to ensure configurations are valid.
Run sudo systemctl status cnsc --no-pager to verify the Next.js app service is active.
Manual Verification
Check the outputs of the list directories ls -l for SSL and Nginx enabled sites.

Lo que debes hacer

1. Verificar certificado de origen

Confirma si existen estos archivos:

Bash


ls -l /etc/ssl/cloudflare/origin-cert.pem
ls -l /etc/ssl/cloudflare/origin-key.pem

Si no existen

toca crear/instalar el Cloudflare Origin Certificate antes de cerrar Full (strict) real.

───

2. Crear landing del bot

Bash


sudo mkdir -p /var/www/bot.iagent.com.co/html
sudo chown -R www-data:www-data /var/www/bot.iagent.com.co

Y crear:

Bash


/var/www/bot.iagent.com.co/html/index.html

con la landing base del bot.

───

3. Crear archivo nginx para cnsc.profemarlon.com

Ruta:

copy


/etc/nginx/sites-available/cnsc.profemarlon.com

Ese bloque debe:

• redirigir 80 -> 443
• servir 443
• hacer proxy_pass a:
• http://127.0.0.1:3000

───

4. Crear archivo nginx para bot.iagent.com.co

Ruta:

Bash


/etc/nginx/sites-available/bot.iagent.com.co

Ese bloque debe:

• redirigir 80 -> 443
• servir 443
• apuntar a:
• /var/www/bot.iagent.com.co/html

───

5. Activar ambos sitios con symlink

Bash


sudo ln -s /etc/nginx/sites-available/cnsc.profemarlon.com /etc/nginx/sites-enabled/cnsc.profemarlon.com
sudo ln -s /etc/nginx/sites-available/bot.iagent.com.co /etc/nginx/sites-enabled/bot.iagent.com.co

───

6. Crear servicio systemd para la app del Frente A

Archivo:

copy


/etc/systemd/system/cnsc.service

Con:

• app Next
• puerto 3000
• NODE_ENV=production
• npm run start
• WorkingDirectory apuntando a la ruta real del proyecto desplegado

Luego:

Bash


sudo systemctl daemon-reload
sudo systemctl enable cnsc
sudo systemctl start cnsc
sudo systemctl status cnsc

───

7. Validar nginx y recargar

Bash


sudo nginx -t
sudo systemctl reload nginx

───

Lo que luego debes pasarme

Cuando termines, envíame estas salidas:

Obligatorio

Bash


sudo nginx -t
sudo systemctl status cnsc --no-pager
ls -l /etc/ssl/cloudflare/
ls -l /etc/nginx/sites-available/
ls -l /etc/nginx/sites-enabled/

Si hubo error

también pásame el error exacto.

───

Resumen corto

Tu checklist de Plan B

1. verificar certificados Cloudflare origin
2. crear landing bot.iagent.com.co
3. crear cnsc.profemarlon.com en nginx
4. crear bot.iagent.com.co en nginx
5. activar symlinks
6. crear servicio cnsc.service
7. validar y recargar nginx
8. pasarme el informe

Si quieres, en el siguiente mensaje te lo doy en formato checklist ejecutable ultra corto para copiar y seguir paso por paso.

Checklist Plan B

1. Verificar certificados Cloudflare origin

Bash


ls -l /etc/ssl/cloudflare/origin-cert.pem
ls -l /etc/ssl/cloudflare/origin-key.pem

───

2. Crear carpeta de landing

Bash


sudo mkdir -p /var/www/bot.iagent.com.co/html
sudo chown -R www-data:www-data /var/www/bot.iagent.com.co

───

3. Crear landing

Bash


sudo nano /var/www/bot.iagent.com.co/html/index.html

───

4. Crear sitio nginx de cnsc.profemarlon.com

Bash


sudo nano /etc/nginx/sites-available/cnsc.profemarlon.com

───

5. Crear sitio nginx de bot.iagent.com.co

Bash


sudo nano /etc/nginx/sites-available/bot.iagent.com.co

───

6. Activar symlinks

Bash


sudo ln -s /etc/nginx/sites-available/cnsc.profemarlon.com /etc/nginx/sites-enabled/cnsc.profemarlon.com
sudo ln -s /etc/nginx/sites-available/bot.iagent.com.co /etc/nginx/sites-enabled/bot.iagent.com.co

───

7. Crear servicio systemd de la app

Bash


sudo nano /etc/systemd/system/cnsc.service

───

8. Activar servicio

Bash


sudo systemctl daemon-reload
sudo systemctl enable cnsc
sudo systemctl start cnsc
sudo systemctl status cnsc --no-pager

───

9. Validar nginx

Bash


sudo nginx -t
sudo systemctl reload nginx

───

Informe que me debes pasar al final

Pégame esto:

Bash


sudo nginx -t
sudo systemctl status cnsc --no-pager
ls -l /etc/ssl/cloudflare/
ls -l /etc/nginx/sites-available/
ls -l /etc/nginx/sites-enabled/

Si algo falla, pégame el error exacto y sigo desde ahí.