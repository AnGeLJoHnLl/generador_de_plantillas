/* ──────────────────────────────────────────────
   HITSS Tickets — Módulo OCR Simple
   Mantiene el motor OCR al 100% exacto y funcional
   con controles de Mover y Subrayar sin alterar la lectura.
   ────────────────────────────────────────────── */

let cropperSimple = null;

document.addEventListener('DOMContentLoaded', () => {
    initOCRSimpleListeners();
});

function initOCRSimpleListeners() {
    const fileInput = document.getElementById('fileInputOCR');
    if (fileInput) fileInput.addEventListener('change', handleFileSelectOCR);

    // Pegado global Ctrl + V
    window.addEventListener('paste', (e) => {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (const item of items) {
            if (item.type.indexOf('image') === 0) {
                const blob = item.getAsFile();
                loadImageBlobOCR(blob);
                if (typeof showToast === 'function') showToast('¡Imagen cargada!');
                break;
            }
        }
    });

    const btnReset = document.getElementById('btnResetCropOCR');
    if (btnReset) btnReset.addEventListener('click', () => cropperSimple && cropperSimple.reset());

    const btnMove = document.getElementById('btnMoveModeOCR');
    if (btnMove) btnMove.addEventListener('click', setMoveModeOCR);

    const btnCrop = document.getElementById('btnCropModeOCR');
    if (btnCrop) btnCrop.addEventListener('click', setCropModeOCR);

    const btnZoomIn = document.getElementById('btnZoomInOCR');
    if (btnZoomIn) btnZoomIn.addEventListener('click', () => cropperSimple && cropperSimple.zoom(0.15));

    const btnZoomOut = document.getElementById('btnZoomOutOCR');
    if (btnZoomOut) btnZoomOut.addEventListener('click', () => cropperSimple && cropperSimple.zoom(-0.15));

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
    // Configuración robusta original de Cropper (autoCropArea: 0.95)
    cropperSimple = new Cropper(img, {
        viewMode: 1,
        dragMode: 'crop',
        autoCropArea: 0.95,
        responsive: true,
        background: false,
        zoomOnWheel: true,
        toggleDragModeOnDblclick: true,
        ready() {
            const btnScan = document.getElementById('btnExtractTextOCR');
            if (btnScan) btnScan.disabled = false;
        }
    });
}

function setMoveModeOCR() {
    if (!cropperSimple) return;
    cropperSimple.setDragMode('move');
    const bMove = document.getElementById('btnMoveModeOCR');
    const bCrop = document.getElementById('btnCropModeOCR');
    if (bMove) { bMove.style.background = 'var(--accent)'; bMove.style.color = '#fff'; }
    if (bCrop) { bCrop.style.background = 'rgba(255,255,255,0.08)'; bCrop.style.color = 'var(--text-secondary)'; }
}

function setCropModeOCR() {
    if (!cropperSimple) return;
    cropperSimple.setDragMode('crop');
    cropperSimple.crop();
    const bMove = document.getElementById('btnMoveModeOCR');
    const bCrop = document.getElementById('btnCropModeOCR');
    if (bCrop) { bCrop.style.background = '#ec4899'; bCrop.style.color = '#fff'; }
    if (bMove) { bMove.style.background = 'rgba(255,255,255,0.08)'; bMove.style.color = 'var(--text-secondary)'; }
}

// Motor Cloud Engine 2 (Alta Precisión)
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
    
    // Obtener canvas del recorte; si por alguna razón es nulo, se genera del cropper completo
    let croppedCanvas = cropperSimple.getCroppedCanvas();
    if (!croppedCanvas) {
        cropperSimple.crop();
        croppedCanvas = cropperSimple.getCroppedCanvas();
    }
    
    if (!croppedCanvas) {
        alert('No se pudo obtener el recuadro de la imagen.');
        return;
    }

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
            console.warn('Fallback local Tesseract:', cloudErr);
            const blob = await new Promise(r => croppedCanvas.toBlob(r, 'image/png'));
            const worker = await Tesseract.createWorker();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const res = await worker.recognize(blob);
            await worker.terminate();
            rawText = res.data.text;
        }

        const cleanedText = (rawText || '').trim();
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
            btnScan.innerHTML = '<i class="fa-solid fa-bolt"></i> Escanear';
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
