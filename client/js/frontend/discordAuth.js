https://discord.com/api/oauth2/authorize?response_type=token&client_id=770744303685337089&scope=identify%20email

let pingDiscord = () => {
    let duthcord = "https://discord.com/api/oauth2/authorize?response_type=token&client_id=770744303685337089&scope=identify%20email"
    return fetch(duthcord)
}