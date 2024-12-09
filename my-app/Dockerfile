# Usa un'immagine Node.js leggera
FROM node:18-alpine

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file di configurazione
COPY package.json package-lock.json ./

# Installa le dipendenze
RUN npm install

# Copia il codice del frontend
COPY . .

# Costruisce l'app per la produzione
RUN npm run build

# Usa un'immagine Nginx per servire i file statici
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

# Espone la porta per Nginx
EXPOSE 80

# Avvia Nginx
CMD ["nginx", "-g", "daemon off;"]
