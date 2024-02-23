document.addEventListener('DOMContentLoaded', function () {
        if (window.innerWidth >= 768) {
                // Function to open sections
                function openSection(sectionId) {
                        var content = document.getElementById(sectionId);
                        content.style.display = "flex"; // Show content.
                    
                        setTimeout(function() {
                            switch (sectionId) {
                                case 'content-section1':
                                    content.style.left = '0'; // Slide-in from left
                                    break;
                                case 'content-section2':
                                    content.style.top = '0'; // Slide-in from top
                                    break;
                                case 'content-section3':
                                    content.style.right = '0'; // Slide-in from right
                                    break;
                            }
                        }, 10);
                    
                    }

                // Function to close sections
                function closeSection(section, propertyName) {
                        var content = document.getElementById(section);

                        if (propertyName === 'left') {
                                content.style.left = '-100%'; // Slide out horizontally.
                        } else if (propertyName === 'top') {
                                content.style.top = '-100%'; // Slide out vertically.
                        } else if (propertyName === 'right'){
                                content.style.right = '-100% ';
                        }

                        setTimeout(function () {
                                if (content.style[propertyName] === '-100%') {
                                        content.classList.remove('slide-in-from-left', 'slide-in-from-top');
                                        content.style.display = "none"; // Hide after animation complete.
                                }
                        }, 500); // Delay should match transition duration in CSS.
                }

                document.getElementById('section1').addEventListener('click', function() {
                        openSection('content-section1');
                        closeSection('content-section2', 'top');
                        closeSection("content-section3", "right");
                     });
                     
                     document.getElementById('close-section1').addEventListener('click', function() {
                        closeSection('content-section1', 'left');
                     });
                     
                     document.getElementById('section2').addEventListener('click', function() {
                        openSection('content-section2');
                        closeSection("content-section3", "right");
                        closeSection('content-section1', 'left');
                     });
                     
                     document.getElementById('close-section2').addEventListener('click', function() {
                        closeSection('content-section2', 'top');
                     });
                     
                     // Event listeners for section3
                     document.getElementById('section3').addEventListener('click', function() {
                        openSection('content-section3');
                        closeSection('content-section2', 'top');
                        closeSection('content-section1', 'left');
                     });
                     
                     document.getElementById("close-section3").addEventListener("click", function(){
                         closeSection("content-section3", "right");
                     });

        }
        if (window.innerWidth < 768) {
                var toggles = document.querySelectorAll('.toggle-section');

                function toggleContent(toggle) {
                        var contentId = 'content-' + toggle.id;
                        var content = document.getElementById(contentId);

                        // Make sure we found a corresponding content element
                        if (content) {
                                toggle.addEventListener('click', function () {
                                        var maxHeight = (content.style.maxHeight && content.style.maxHeight !== '0px') ? '0px' : `${content.scrollHeight}px`;
                                        content.style.maxHeight = maxHeight;
                                });
                        }
                }

                toggles.forEach(function (toggle) {
                        toggleContent(toggle);
                });
        }
        var russianLocale = {
                previousMonth : 'Предыдущий месяц',
                nextMonth     : 'Следующий месяц',
                months        : ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь ','ноябрь ','декабрь'],
                weekdays      : ['воскресенье','понедельник ','вторник ','среда ','четверг ', 'пятница', 'суббота'],
                weekdaysShort : ['Вс', 'Пн', 'Вт', 'Ср', 'Чт',  'Пт',  'Сб']
            };
            
            // Instantiate a new Pikaday object for the delivery date input field with Russian localization
            var picker = new Pikaday({
                field: document.getElementById('delivery-date'),
                i18n: russianLocale,
                toString(date, format){
                   const day = date.getDate();
                   const month = russianLocale.months[date.getMonth()];
                   const year = date.getFullYear();
                   // We use "weekdaysShort" instead of "weekdays" because "weekdays" usually starts with Sunday (0 index)
                   const weekday = russianLocale.weekdaysShort[date.getDay()];
            
                   return `${weekday} ${month} ${day} ${year}`;
               }
            });

});

      
    