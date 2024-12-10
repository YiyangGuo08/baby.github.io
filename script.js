
const hoverWindow = document.querySelector('.hover-window');
const circles = document.querySelectorAll('.interactive-circle');

const genderSelect = document.getElementById('gender-select');
const distanceSelect = document.getElementById('distance-select');
const ageSelect = document.getElementById('age-select');
// const imageContainer = document.querySelector('.image-container');


// 加载 JSON 文件   测试版
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        circles.forEach(circle => {
            // 获取交互点对应的数据索引
            const index = circle.dataset.index;

            // 悬停事件
            circle.addEventListener('mouseenter', (e) => {
                const person = data[index];

                // 调用人物信息
                document.getElementById('name-age').textContent = `${person.name}, ${person.age} years old`;
                document.getElementById('year-born-dead').textContent = `${person.BornDead}`;
                document.getElementById('injury').textContent = `${person.injury}`;
                document.getElementById('story').textContent = `${person.story}`;
                document.getElementById('name-age1').textContent = `${person.name}, ${person.age} years old`;
                document.getElementById('distance').textContent = `${person.distance} kilometers`;

                // 显示窗口
                hoverWindow.style.display = 'block';
                hoverWindow.style.top = `${e.clientY + 10}px`;
                hoverWindow.style.left = `${e.clientX + 10}px`;
            });

            // 鼠标离开事件
            circle.addEventListener('mouseleave', () => {
                hoverWindow.style.display = 'none';
            });

            // 鼠标移动事件
            circle.addEventListener('mousemove', (e) => {
                hoverWindow.style.top = `${e.clientY + 10}px`;
                hoverWindow.style.left = `${e.clientX + 10}px`;
            });
        });

        // -------- 分类功能 ---------
        // genderSelect.addEventListener('change', (e) => {
        //     const selectedGender = e.target.value;
        //     circles.forEach(circle => {
        //         const person = data[circle.dataset.index];
        //         if (selectedGender === 'all' || person.gender === selectedGender) {
        //             circle.style.display = 'block';
        //         } else {
        //             circle.style.display = 'none';
        //         }
        //     });
        // });

        // 筛选功能
        const filterCircles = () => {
            const selectedGender = genderSelect.value;
            const selectedDistance = distanceSelect.value;
            const selectedAge = ageSelect.value;

            circles.forEach(circle => {
                const person = data[circle.dataset.index];

                // 区间判断逻辑
                const genderMatch = selectedGender === 'all' || person.gender === selectedGender;
                const distanceMatch = selectedDistance === 'all' ||
                    (selectedDistance === 'center~2km' && person.distance <= 2) ||
                    (selectedDistance === '2km~4km' && person.distance > 2 && person.distance < 4) ||
                    (selectedDistance === '4km~beyond' && person.distance >= 4);
                const ageMatch = selectedAge === 'all' ||
                    (selectedAge === '0~10' && person.age >= 0 && person.age <= 10) ||
                    (selectedAge === '10~20' && person.age > 10 && person.age <= 20) ||
                    (selectedAge === '20~30' && person.age > 20 && person.age <= 30) ||
                    (selectedAge === '30+' && person.age > 30);

                // 根据匹配结果显示或隐藏点
                if (genderMatch && distanceMatch && ageMatch) {
                    circle.style.display = 'block';
                } else {
                    circle.style.display = 'none';
                }
            });
        };

        // 监听筛选事件
        genderSelect.addEventListener('change', filterCircles);
        distanceSelect.addEventListener('change', filterCircles);
        ageSelect.addEventListener('change', filterCircles);



    })
    .catch(error => console.error('Error loading JSON:', error));


// 加载 JSON 文件 能跑版
// fetch('data.json')
//     .then(response => response.json())
//     .then(data => {
//         // 为每个圆添加鼠标事件
//         circles.forEach(circle => {


//             circle.addEventListener('mouseenter', (e) => {
//                 const index = e.target.getAttribute('data-index'); // 获取点的索引
//                 const person = data[index]; // 获取对应的人的信息

//                 // 调用人物信息
//                 document.getElementById('name-age').textContent = `${person.name}, ${person.age} years old`;
//                 document.getElementById('year-born-dead').textContent = `${person.BornDead}`;
//                 document.getElementById('injury').textContent = `${person.injury}`;
//                 document.getElementById('story').textContent = `${person.story}`;
//                 document.getElementById('name-age1').textContent = `${person.name}, ${person.age} years old`;


//                 // 显示窗口
//                 hoverWindow.style.display = 'block';
//                 hoverWindow.style.top = `${e.clientY + 10}px`;
//                 hoverWindow.style.left = `${e.clientX + 10}px`;
//             });


//             circle.addEventListener('mouseleave', () => {
//                 hoverWindow.style.display = 'none'; // 隐藏窗口
//             });

//             circle.addEventListener('mousemove', (e) => {
//                 // 跟随鼠标移动窗口
//                 hoverWindow.style.top = `${e.clientY + 10}px`;
//                 hoverWindow.style.left = `${e.clientX + 10}px`;
//             });
//         });
//     })
//     .catch(error => console.error('Error loading JSON:', error));



