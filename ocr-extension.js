/* ──────────────────────────────────────────────
   HITSS Tickets — Módulo OCR Simple (Debajo de Notas Rápidas)
   Escanea únicamente el área recortada sin clasificaciones ni tarjetas.
   ────────────────────────────────────────────── */

let cropperSimple = null;

document.addEventListener('DOMContentLoaded', () => {
    initOCRSimpleListeners();
});

function initOCRSimpleListeners() {
    const fileInput = document.getElementById('fileInputOCR');
    if (fileInput) fileInput.addEventListener('change', handleFileSelectOCR);

    // Global Ctrl + V paste listener
    window.addEventListener('paste', (e) => {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (const item of items) {
            if (item.type.indexOf('image') === 0) {
                const blob = item.getAsFile();
                loadImageBlobOCR(blob);
                if (typeof showToast === 'function') showToast('¡Imagen cargada en el Escáner!');
                break;
            }
        }
    });

    const btnReset = document.getElementById('btnResetCropOCR');
    if (btnReset) btnReset.addEventListener('click', () => cropperSimple && cropperSimple.reset());

    const btnScan = document.getElementById('btnExtractTextOCR');
    if (btnScan) btnScan.addEventListener('click', processOCRSimple);
}

function handleFileSelectOCR(e) {
    if (e.target.files && e.target.files[0]) {
        loadImageBlobOCR(e.target.files[0]);
    }
}

function loadImageBlobOCR(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        initCropperOCR(e.target.result);
    };
    reader.readAsDataURL(file);
}

function initCropperOCR(imageSrc) {
    const dropzone = document.getElementById('dropzoneOCR');
    const wrapper = document.getElementById('cropperWrapperOCR');
    const toolbar = document.getElementById('cropperToolbarOCR');
    const img = document.getElementById('imageToCropOCR');

    if (dropzone) dropzone.classList.add('hidden');
    if (wrapper) wrapper.classList.remove('hidden');
    if (toolbar) toolbar.classList.remove('hidden');

    if (cropperSimple) cropperSimple.destroy();

    img.src = imageSrc;
    cropperSimple = new Cropper(img, {
        viewMode: 1,
        autoCropArea: 0.95,
        responsive: true,
        background: false,
        ready() {
            const btnScan = document.getElementById('btnExtractTextOCR');
            if (btnScan) btnScan.disabled = false;
        }
    });
}

// Cloud OCR Engine 2 High Precision
async function processCloudOCRSimple(croppedCanvas) {
    const dataUrl = croppedCanvas.toDataURL('image/png');
    const formData = new FormData();
    formData.append('base64Image', dataUrl);
    formData.append('language', 'eng');
    formData.append('isOverlayRequired', 'false');
    formData.append('OCREngine', '2');
    formData.append('scale', 'true');
    formData.append('apikey', 'K87948218888957');

    const response = await fetch('https://api.ocr.space/parse/image', { method: 'POST', body: formData });
    const json = await response.json();
    if (json.IsErroredOnProcessing) throw new Error(json.ErrorMessage ? json.ErrorMessage[0] : 'Error en OCR');
    return (json.ParsedResults && json.ParsedResults.length > 0) ? json.ParsedResults[0].ParsedText : '';
}

async function processOCRSimple() {
    if (!cropperSimple) return;
    const croppedCanvas = cropperSimple.getCroppedCanvas();
    if (!croppedCanvas) return;

    const btnScan = document.getElementById('btnExtractTextOCR');
    const output = document.getElementById('ocrOutputSimple');

    if (btnScan) {
        btnScan.disabled = true;
        btnScan.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Escaneando...';
    }

    try {
        let rawText = '';
        try {
            rawText = await processCloudOCRSimple(croppedCanvas);
        } catch (cloudErr) {
            console.warn('Fallback local:', cloudErr);
            const blob = await new Promise(r => croppedCanvas.toBlob(r, 'image/png'));
            const worker = await Tesseract.createWorker();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const res = await worker.recognize(blob);
            await worker.terminate();
            rawText = res.data.text;
        }

        const cleanedText = rawText.trim();
        if (output) output.value = cleanedText;

        if (cleanedText.length > 0) {
            if (typeof showToast === 'function') showToast('¡Texto escaneado!');
        } else {
            alert('No se detectó texto en el recorte.');
        }

    } catch (err) {
        console.error(err);
        alert('Error al escanear: ' + err.message);
    } finally {
        if (btnScan) {
            btnScan.disabled = false;
            btnScan.innerHTML = '<i class="fa-solid fa-bolt"></i> Escanear Recorte';
        }
    }
}

function copyOCRResultText() {
    const output = document.getElementById('ocrOutputSimple');
    if (!output || !output.value) {
        alert('No hay texto escaneado para copiar.');
        return;
    }

    navigator.clipboard.writeText(output.value).then(() => {
        if (typeof showToast === 'function') showToast('¡Texto escaneado copiado!');
    }).catch(err => {
        console.error(err);
    });
}
