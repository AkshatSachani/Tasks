const socket = io()

setTimeout(() => {
    document.getElementById('location').click()
}, 500);
document.querySelector('#location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Your device not support navigator')
    }
    navigator.geolocation.getCurrentPosition((position) => {
        window.localStorage.setItem('data',JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }))
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Location deliverd..!');
        })
    })
})