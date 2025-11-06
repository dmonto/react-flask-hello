# Usa una imagen de contenedor de desarrollo de Microsoft que incluye Python 3.10 y herramientas comunes.
FROM mcr.microsoft.com/devcontainers/python:1-3.10-bullseye

# Etiqueta para describir el propósito de la imagen.
LABEL description="Entorno de desarrollo para el proyecto Full-Stack React/Flask."

# Instala dependencias del sistema: Node.js 20.x y cliente de PostgreSQL.
# La instalación de Node.js se hace a través del repositorio oficial de NodeSource.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y --no-install-recommends curl gnupg libpq-dev \
    # Instala Node.js 20.x
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    # Limpia la caché de apt para reducir el tamaño de la imagen.
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Instala Pipenv, el gestor de paquetes de Python del proyecto.
RUN pip install pipenv

# Establece el directorio de trabajo dentro del contenedor.
WORKDIR /workspace

# Copia los archivos de dependencias primero para aprovezar el cache de Docker.
# Esto evita reinstalar dependencias si solo cambia el código fuente.
COPY Pipfile Pipfile.lock ./
COPY package.json package-lock.json ./

# Instala las dependencias de Python usando Pipenv.
# --system instala los paquetes en el entorno de Python del sistema, no en un virtualenv.
# --dev incluye las dependencias de desarrollo.
RUN pipenv install --system --dev

# Instala las dependencias de frontend (Node.js).
RUN npm install

# Copia el resto de los archivos del proyecto al directorio de trabajo.
COPY . .

# Expone los puertos que la aplicación utilizará.
# 3001 para el backend de Flask y 3000 para el servidor de desarrollo de Vite (React).
EXPOSE 3001 3000

# Comando por defecto para mantener el contenedor en ejecución.
# Esto permite a VS Code y al usuario conectarse a un contenedor en funcionamiento.
CMD ["sleep", "infinity"]
