export async function imageUrlToDataUrl(url: string): Promise<string> {
    const response = await fetch(url, {mode: "cors"});
    if(!response.ok) throw new Error(`Không thể tải ảnh mock: ${response.status}`);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if(typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject(new Error("Không thể convert anh sang Data URL"));
            }
        };

        reader.onerror = () => reject(new Error("FileReader failed"));

        reader.readAsDataURL(blob);
    })
}