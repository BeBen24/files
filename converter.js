// converter.js
async function uploadAndConvert(file, targetFormat) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('target_format', targetFormat);
  
    const response = await puter.net.fetch('https://v2.convertapi.com/upload', {
      method: 'POST',
      body: formData
    });
  
    if (!response.ok) throw new Error('ההעלאה נכשלה');
  
    const data = await response.json();
    return data;
  }
  
