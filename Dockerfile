FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["WebYapei/WebYapei.csproj", "WebYapei/"]
RUN dotnet restore "WebYapei/WebYapei.csproj"
COPY . .
WORKDIR "/src/WebYapei"
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "WebYapei.dll"]
