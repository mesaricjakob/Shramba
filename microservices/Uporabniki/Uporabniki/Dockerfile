FROM mcr.microsoft.com/dotnet/sdk:7.0 as build

EXPOSE 5102

WORKDIR /app
COPY . .
RUN dotnet restore
RUN dotnet publish -o /app/published-app


FROM mcr.microsoft.com/dotnet/sdk:7.0 as runtime
WORKDIR /app
COPY --from=build /app/published-app /app
ENV ASPNETCORE_URLS http://+:5102
ENTRYPOINT ["dotnet", "Uporabniki.dll"]
