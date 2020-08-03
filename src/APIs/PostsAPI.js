export const loadPostsAPI = (cursor) => {
    return fetch(`https://guard.io/v2/hiring/fe/breaches?offset=${cursor}`, {headers:{"X-Best-Pokemon":"Pikachu"}});
}
