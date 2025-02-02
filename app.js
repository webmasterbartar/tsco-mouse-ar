window.onload = function() {
    const scene = document.querySelector('a-scene');
    const marker = document.querySelector('a-marker');
    const statusDiv = document.querySelector('#status');

    // بررسی وضعیت لود شدن صحنه
    scene.addEventListener('loaded', function () {
        console.log('Scene loaded');
        statusDiv.innerText = 'صحنه AR آماده شد - لطفا مارکر را نشان دهید';
    });

    // بررسی تشخیص مارکر
    marker.addEventListener('markerFound', function() {
        console.log('Marker found');
        statusDiv.innerText = 'مارکر پیدا شد!';
    });

    marker.addEventListener('markerLost', function() {
        console.log('Marker lost');
        statusDiv.innerText = 'لطفا مارکر را مقابل دوربین بگیرید';
    });

    // بررسی خطاهای احتمالی
    scene.addEventListener('arError', function(ev) {
        console.error('AR error:', ev);
        statusDiv.innerText = 'خطا در AR: ' + ev.detail.error;
    });

    // اضافه کردن ویژگی look-at برای همه المان‌های متنی
    const texts = document.querySelectorAll('a-text');
    texts.forEach(text => {
        text.setAttribute('look-at', '[camera]');
    });
    
    // بروزرسانی موقعیت المان‌ها در هر فریم
    scene.addEventListener('renderstart', function() {
        if (markerVisible) {
            const texts = document.querySelectorAll('a-text');
            texts.forEach(text => {
                // اطمینان از اینکه متن همیشه رو به دوربین است
                text.components['look-at'].updatePosition();
            });
        }
    });
} 
