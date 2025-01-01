document.getElementById('bannerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const backgroundColor = document.getElementById('backgroundColor').value;
    const textColor = document.getElementById('textColor').value;

    const response = await fetch('/generate-banner', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, backgroundColor, textColor }),
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const banner = document.getElementById('banner');
    banner.src = url;
    banner.style.display = 'block';
});