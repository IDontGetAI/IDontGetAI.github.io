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

// 留言管理功能
function manageMessages() {
    const messagesContainer = document.querySelector('.messages');
    if (!messagesContainer) return;
    
    // 添加折叠功能
    function toggleMessages() {
        const messageItems = messagesContainer.querySelectorAll('.message-item');
        const toggleBtn = messagesContainer.querySelector('.toggle-messages');
        
        if (messageItems.length > 10) {
            // 如果没有折叠按钮，创建一个
            if (!toggleBtn) {
                const btn = document.createElement('button');
                btn.className = 'toggle-messages btn';
                btn.textContent = '显示更多留言';
                btn.style.margin = '1rem 0';
                btn.style.display = 'block';
                btn.style.marginLeft = 'auto';
                btn.style.marginRight = 'auto';
                
                btn.addEventListener('click', function() {
                    const hiddenMessages = messagesContainer.querySelectorAll('.message-item.hidden');
                    if (hiddenMessages.length > 0) {
                        // 展开所有留言
                        hiddenMessages.forEach(msg => msg.classList.remove('hidden'));
                        this.textContent = '收起部分留言';
                    } else {
                        // 只显示前10条留言
                        for (let i = 10; i < messageItems.length; i++) {
                            messageItems[i].classList.add('hidden');
                        }
                        this.textContent = '显示更多留言';
                    }
                });
                
                messagesContainer.appendChild(btn);
            }
            
            // 初始只显示前10条留言
            for (let i = 10; i < messageItems.length; i++) {
                messageItems[i].classList.add('hidden');
            }
        } else if (toggleBtn) {
            // 如果留言数量不超过10条，移除折叠按钮
            toggleBtn.remove();
            // 显示所有留言
            messageItems.forEach(msg => msg.classList.remove('hidden'));
        }
    }
    
    // 添加管理按钮到每条留言
    function addManagementButtons() {
        const messageItems = messagesContainer.querySelectorAll('.message-item');
        
        messageItems.forEach(item => {
            // 如果已经添加了管理按钮，跳过
            if (item.querySelector('.message-management')) return;
            
            // 创建管理按钮容器
            const managementDiv = document.createElement('div');
            managementDiv.className = 'message-management';
            managementDiv.style.display = 'flex';
            managementDiv.style.justifyContent = 'flex-end';
            managementDiv.style.marginTop = '0.5rem';
            
            // 删除按钮
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-message';
            deleteBtn.textContent = '删除';
            deleteBtn.style.backgroundColor = '#dc3545';
            deleteBtn.style.color = 'white';
            deleteBtn.style.border = 'none';
            deleteBtn.style.borderRadius = '4px';
            deleteBtn.style.padding = '0.3rem 0.6rem';
            deleteBtn.style.marginLeft = '0.5rem';
            deleteBtn.style.cursor = 'pointer';
            
            deleteBtn.addEventListener('click', function() {
                if (confirm('确定要删除这条留言吗？')) {
                    item.remove();
                    toggleMessages(); // 重新检查是否需要折叠
                }
            });
            
            // 隐藏按钮
            const hideBtn = document.createElement('button');
            hideBtn.className = 'hide-message';
            hideBtn.textContent = '隐藏';
            hideBtn.style.backgroundColor = '#6c757d';
            hideBtn.style.color = 'white';
            hideBtn.style.border = 'none';
            hideBtn.style.borderRadius = '4px';
            hideBtn.style.padding = '0.3rem 0.6rem';
            hideBtn.style.marginLeft = '0.5rem';
            hideBtn.style.cursor = 'pointer';
            
            hideBtn.addEventListener('click', function() {
                item.classList.toggle('hidden');
                toggleMessages(); // 重新检查是否需要折叠
            });
            
            // 添加按钮到容器
            managementDiv.appendChild(hideBtn);
            managementDiv.appendChild(deleteBtn);
            
            // 添加管理按钮到留言项
            item.appendChild(managementDiv);
        });
    }
    
    // 初始化
    toggleMessages();
    addManagementButtons();
    
    // 返回函数用于在添加新留言后调用
    return {
        toggleMessages,
        addManagementButtons
    };
}

// 表单提交处理
function handleFormSubmit() {
    const form = document.querySelector('form');
    const messagesContainer = document.querySelector('.messages');
    
    if (form && messagesContainer) {
        // 初始化留言管理
        const messageManager = manageMessages();
        
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
                
                // 为新留言添加管理按钮
                messageManager.addManagementButtons();
                
                // 更新折叠状态
                messageManager.toggleMessages();
                
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
    // 初始化留言管理
    manageMessages();
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