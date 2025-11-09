

export async function loginUser(payload) {
    const url = "http://1270.0.1:5000/api/auth/login";
    let res;
    try {
        res = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });
    }
}
