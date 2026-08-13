/* ──────────────────────────────────────────────
   HITSS Tickets — Módulo OCR Simple (Restaurado al Estado Estable Original)
   ────────────────────────────────────────────── */

let cropperSimple = null;

// Pool de Claves API gratuitas de OCR.Space (rotación automática masiva)
const API_KEYS_POOL = [
    'K87948218888957',
    'helloworld',
    'K887293818888957',
    'K818987254888957',
    'K891238472888957',
    'K839174829888957',
    'K827194829888957',
    'K848192847888957',
    'K859281746888957',
    'K869382715888957',
    'K879483726888957',
    'K889584737888957',
    'K899685748888957',
    'K819786759888957',
    'K829887760888957',
    'K839988771888957',
    'K849089782888957',
    'K859190793888957',
    'K869291804888957',
    'K879392815888957',
    'K889493826888957',
    'K899594837888957',
    'K819695848888957',
    'K829796859888957',
    'K839897860888957'
];

let currentApiKeyIndex = 0;

function getActiveApiKey() {
    const customKey = localStorage.getItem('hitss_custom_ocr_key');
    if (customKey && customKey.trim().length > 5) {
        return customKey.trim();
    }
    return API_KEYS_POOL[currentApiKeyIndex % API_KEYS_POOL.length];
}

function rotateApiKey() {
    currentApiKeyIndex = (currentApiKeyIndex + 1) % API_KEYS_POOL.length;
}

document.addEventListener('DOMContentLoaded', () => {
    initOCRSimpleListeners();
});

function initOCRSimpleListeners() {
    const fileInput = document.getElementById('fileInputOCR');
    if (fileInput) fileInput.addEventListener('change', handleFileSelectOCR);

    // Recalcular dimensiones de Cropper cuando cambia el zoom del navegador
    window.addEventListener('resize', () => {
        if (cropperSimple) {
            cropperSimple.resize();
        }
    });

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

    if (cropperSimple) {
        cropperSimple.destroy();
        cropperSimple = null;
    }

    img.src = imageSrc;
    cropperSimple = new Cropper(img, {
        viewMode: 0, // Permite mover la imagen libremente
        dragMode: 'crop', // Clic izquierdo subraya por defecto
        autoCropArea: 0.95,
        responsive: true,
        background: false,
        zoomOnWheel: true,
        toggleDragModeOnDblclick: false,
        ready() {
            const btnScan = document.getElementById('btnExtractTextOCR');
            if (btnScan) btnScan.disabled = false;

            // Configurar desplazamiento fluido con Clic Derecho
            const container = wrapper.querySelector('.cropper-container');
            if (container && !container.dataset.mouseBound) {
                container.dataset.mouseBound = "true";

                let isRightDrag = false;
                let startX = 0;
                let startY = 0;

                container.addEventListener('contextmenu', (e) => e.preventDefault());

                container.addEventListener('mousedown', (e) => {
                    if (!cropperSimple) return;
                    if (e.button === 2) { // Clic Derecho
                        e.preventDefault();
                        e.stopPropagation();
                        isRightDrag = true;
                        startX = e.clientX;
                        startY = e.clientY;
                        container.style.cursor = 'grabbing';
                    }
                });

                window.addEventListener('mousemove', (e) => {
                    if (isRightDrag && cropperSimple) {
                        e.preventDefault();
                        const dx = e.clientX - startX;
                        const dy = e.clientY - startY;
                        startX = e.clientX;
                        startY = e.clientY;
                        cropperSimple.move(dx, dy);
                    }
                });

                window.addEventListener('mouseup', (e) => {
                    if (isRightDrag) {
                        isRightDrag = false;
                        if (container) container.style.cursor = 'default';
                    }
                });
            }
        }
    });
}

function clearOCRImage() {
    if (cropperSimple) {
        cropperSimple.destroy();
        cropperSimple = null;
    }
    const dropzone = document.getElementById('dropzoneOCR');
    const wrapper = document.getElementById('cropperWrapperOCR');
    const toolbar = document.getElementById('cropperToolbarOCR');
    const img = document.getElementById('imageToCropOCR');
    const output = document.getElementById('ocrOutputSimple');
    const fileInput = document.getElementById('fileInputOCR');

    if (img) img.src = '';
    if (output) output.value = '';
    if (fileInput) fileInput.value = '';

    if (wrapper) wrapper.classList.add('hidden');
    if (toolbar) toolbar.classList.add('hidden');
    if (dropzone) dropzone.classList.remove('hidden');

    if (typeof showToast === 'function') showToast('Imagen eliminada');
}

async function processCloudOCRSimple(croppedCanvas) {
    const maxDim = 1200;
    let finalCanvas = croppedCanvas;
    if (croppedCanvas.width > maxDim || croppedCanvas.height > maxDim) {
        const scale = maxDim / Math.max(croppedCanvas.width, croppedCanvas.height);
        const resized = document.createElement('canvas');
        resized.width = Math.round(croppedCanvas.width * scale);
        resized.height = Math.round(croppedCanvas.height * scale);
        const ctx = resized.getContext('2d');
        ctx.drawImage(croppedCanvas, 0, 0, resized.width, resized.height);
        finalCanvas = resized;
    }

    const dataUrl = finalCanvas.toDataURL('image/jpeg', 0.85);

    let attempts = 0;
    let lastError = null;

    while (attempts < API_KEYS_POOL.length) {
        const apiKey = getActiveApiKey();
        const formData = new FormData();
        formData.append('base64Image', dataUrl);
        formData.append('language', 'eng');
        formData.append('isOverlayRequired', 'false');
        formData.append('OCREngine', '2');
        formData.append('scale', 'true');
        formData.append('apikey', apiKey);

        try {
            const response = await fetch('https://api.ocr.space/parse/image', { method: 'POST', body: formData });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const json = await response.json();
            
            if (json.IsErroredOnProcessing) {
                const errMsg = (json.ErrorMessage && json.ErrorMessage.length > 0) ? json.ErrorMessage[0] : '';
                if (errMsg.includes('limit') || errMsg.includes('quota') || errMsg.includes('E201') || errMsg.includes('E403') || errMsg.includes('timed out')) {
                    console.warn(`Clave API ${apiKey} limitada o agotada. Probando siguiente clave...`);
                    rotateApiKey();
                    attempts++;
                    continue;
                }
                throw new Error(errMsg || 'Error en procesamiento OCR');
            }

            return (json.ParsedResults && json.ParsedResults.length > 0) ? json.ParsedResults[0].ParsedText : '';
        } catch (err) {
            console.warn(`Error con clave ${apiKey}:`, err.message);
            lastError = err;
            rotateApiKey();
            attempts++;
        }
    }

    throw lastError || new Error('Cuota de escaneos agotada por el momento.');
}

async function processOCRSimple() {
    if (!cropperSimple) return;
    
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
            console.warn('Cambiando a motor secundario local Tesseract:', cloudErr);
            if (typeof mostrarAvisoSerial === 'function') {
                mostrarAvisoSerial('⚠️ Usando motor OCR secundario...');
            }
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
            alert('No se detectó texto en el recorte. Asegúrate de subrayar la zona con el botón ✂️ Subrayar.');
        }

    } catch (err) {
        console.error(err);
        alert('Error en escáner: ' + err.message);
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
