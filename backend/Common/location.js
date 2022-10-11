export const locationSuccess = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
}

export const locationError = (error) => {
    const code = error.code;
    const message = error.message;
}