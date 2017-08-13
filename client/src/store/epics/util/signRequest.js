export const signRequest = req => ({
    ...req,
    headers: {
        'Authorization': `Basic ${window.btoa(decodeURI(encodeURIComponent('user:password1')))}`,
    },
});
