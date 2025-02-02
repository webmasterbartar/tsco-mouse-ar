window.onload = function() {
    const marker = document.querySelector('a-marker');
    const scene = document.querySelector('a-scene');
    
    // وضعیت نمایش مارکر
    let markerVisible = false;
    
    marker.addEventListener('markerFound', function() {
        markerVisible = true;
        console.log('مارکر پیدا شد!');
    });
    
    marker.addEventListener('markerLost', function() {
        markerVisible = false;
        console.log('مارکر از دست رفت!');
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