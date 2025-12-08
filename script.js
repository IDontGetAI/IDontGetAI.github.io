// 平滑滚动
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 导航栏高亮
function highlightNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('class');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// 表单提交处理
function handleFormSubmit() {
    const form = document.querySelector('form');
    const messagesContainer = document.querySelector('.messages');
    
    if (form && messagesContainer) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 简单的表单验证
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                // 创建新留言元素
                const messageItem = document.createElement('div');
                messageItem.className = 'message-item';
                
                // 获取当前日期
                const now = new Date();
                const dateStr = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
                
                // 设置留言内容
                messageItem.innerHTML = `
                    <div class="message-header">
                        <span class="message-name">${name}</span>
                        <span class="message-date">${dateStr}</span>
                    </div>
                    <div class="message-content">
                        <p>${message}</p>
                    </div>
                `;
                
                // 将新留言添加到留言列表开头
                const firstMessage = messagesContainer.querySelector('.message-item');
                if (firstMessage) {
                    messagesContainer.insertBefore(messageItem, firstMessage);
                } else {
                    messagesContainer.appendChild(messageItem);
                }
                
                // 显示成功消息
                alert('留言提交成功！感谢您的反馈。');
                
                // 重置表单
                form.reset();
            } else {
                alert('请填写所有必填字段。');
            }
        });
    }
}

// 进度条动画
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const width = target.style.width;
                target.style.width = '0%';
                setTimeout(() => {
                    target.style.width = width;
                }, 100);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    smoothScroll();
    highlightNav();
    handleFormSubmit();
    animateProgressBars();
});

// 添加导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.style.backgroundColor = '#222';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = '#333';
        navbar.style.boxShadow = 'none';
    }
});

// 添加回到顶部按钮
function addBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.id = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #007bff;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        z-index: 999;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 页面加载完成后添加回到顶部按钮
document.addEventListener('DOMContentLoaded', addBackToTopButton);

// 添加链接悬停效果
function addLinkHoverEffect() {
    const links = document.querySelectorAll('a');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// 页面加载完成后添加链接悬停效果
document.addEventListener('DOMContentLoaded', addLinkHoverEffect);

// 添加卡片悬停效果
function addCardHoverEffect() {
    const cards = document.querySelectorAll('.course-item, .category-item, .project-item, .tool-item, .group-item, .blog-item, .resource-item, .summary-item, .insight-item, .link-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.15)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        });
    });
}

// 页面加载完成后添加卡片悬停效果
document.addEventListener('DOMContentLoaded', addCardHoverEffect);