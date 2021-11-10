(() => {
    let timeoutHandle = null;
    window.showToast = (id, duration = 3000) => {
        const toast = document.querySelector(`#${id}`);
        
        for (const t of document.querySelectorAll('.toast')) {
            t.classList.remove('toast-show');
        }

        toast.classList.add('toast-show');
        window.clearTimeout(timeoutHandle);
        timeoutHandle = window.setTimeout(() => {
            toast.classList.remove('toast-show');
        }, duration);
    }
})();
