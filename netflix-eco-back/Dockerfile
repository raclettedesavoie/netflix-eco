# Stage 1 : Build avec le SDK .NET 9.0
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copier tous les fichiers dans le contexte
COPY . .

# Publier en mode Release dans /app/publish
RUN dotnet publish netflix-eco-back.csproj -c Release -o /app/publish

# Stage 2 : Runtime léger .NET 9.0
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

# Copier les fichiers publiés du build
COPY --from=build /app/publish .

# Exposer le port dynamique
ENV ASPNETCORE_URLS=http://+:${PORT}
EXPOSE ${PORT}

# Démarrer l'application
ENTRYPOINT ["dotnet", "netflix-eco-back.dll"]