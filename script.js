// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化AOS动画库
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // 导航栏滚动效果
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 动态背景系统 - 暂时禁用
    /*
    const dynamicBackground = document.getElementById('dynamicBackground');
    let currentBackground = 'homepage';
    
    // 背景映射配置
    const backgroundMap = {
        'homepage': 'background-homepage',
        'products': 'background-products',
        'industries': 'background-industries',
        'technologies': 'background-technologies',
        'about': 'background-about',
        'contact': 'background-contact'
    };
    
    // 切换背景函数
    function switchBackground(newBackground) {
        if (currentBackground === newBackground) return;
        
        // 添加过渡效果
        dynamicBackground.classList.add('background-transition');
        dynamicBackground.classList.add('fade-out');
        
        setTimeout(() => {
            // 移除旧背景类
            Object.values(backgroundMap).forEach(bgClass => {
                dynamicBackground.classList.remove(bgClass);
            });
            
            // 添加新背景类
            const newBgClass = backgroundMap[newBackground];
            if (newBgClass) {
                dynamicBackground.classList.add(newBgClass);
            }
            
            currentBackground = newBackground;
            
            // 淡入效果
            dynamicBackground.classList.remove('fade-out');
            dynamicBackground.classList.add('fade-in');
            
            setTimeout(() => {
                dynamicBackground.classList.remove('background-transition', 'fade-in');
            }, 1200);
        }, 600);
    }
    */
    
    // 平滑滚动导航
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // 如果是外部链接（包含.html或http），允许正常跳转
            if (targetId.includes('.html') || targetId.startsWith('http')) {
                return; // 允许默认行为
            }
            
            // 如果是页面内锚点，进行平滑滚动和背景切换
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // 更新活动导航项
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    this.classList.add('active');
                    
                    // 根据锚点切换背景 - 暂时禁用
                    /*
                    const sectionId = targetId.substring(1);
                    if (sectionId === 'home') {
                        switchBackground('homepage');
                    } else if (sectionId === 'about') {
                        switchBackground('about');
                    } else if (sectionId === 'service') {
                        switchBackground('contact');
                    }
                    */
                }
            }
        });
    });
    
    // 监听页面滚动，根据当前可见区域切换背景 - 暂时禁用
    /*
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // 根据当前区域切换背景
        if (currentSection === 'home') {
            switchBackground('homepage');
        } else if (currentSection === 'about') {
            switchBackground('about');
        } else if (currentSection === 'service') {
            switchBackground('contact');
        }
    });
    */

    // 语言切换功能
    const languageToggle = document.getElementById('languageToggle');
    let currentLanguage = 'zh';
    
    languageToggle.addEventListener('click', function() {
        currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
        this.innerHTML = currentLanguage === 'zh' ? 
            '<i class="fas fa-globe"></i> 中文 / EN' : 
            '<i class="fas fa-globe"></i> 中文 / EN';
        
        // 这里可以添加实际的语言切换逻辑
        console.log('Language switched to:', currentLanguage);
    });

    // AI聊天系统
    const chatLauncher = document.getElementById('chatLauncher');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const minimizeChat = document.getElementById('minimizeChat');
    const sendMessage = document.getElementById('sendMessage');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const quickQuestions = document.querySelectorAll('.quick-question');

    // 聊天窗口控制
    chatLauncher.addEventListener('click', function() {
        chatWindow.classList.add('active');
        chatInput.focus();
    });

    closeChat.addEventListener('click', function() {
        chatWindow.classList.remove('active');
    });

    minimizeChat.addEventListener('click', function() {
        chatWindow.classList.remove('active');
    });

    // 发送消息功能
    function sendUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <div class="message-time">刚刚</div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // 显示AI正在输入
        showTypingIndicator();
        
        // 模拟AI回复
        setTimeout(() => {
            hideTypingIndicator();
            generateAIResponse(message);
        }, 1000 + Math.random() * 2000);
    }

    // 显示AI正在输入指示器
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 隐藏AI正在输入指示器
    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // 生成AI回复
    function generateAIResponse(userMessage) {
        const response = getAIResponse(userMessage);
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${response}</p>
            </div>
            <div class="message-time">刚刚</div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // AI知识库和回复逻辑
    function getAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // 产品相关问答
        if (message.includes('重量') || message.includes('吨')) {
            return 'AVT plus 0.3T MRI设备的重量仅为1-3吨，相比传统MRI设备大幅减轻，无需场地加固，安装更加灵活便捷。';
        }
        
        if (message.includes('成本') || message.includes('电费') || message.includes('运营')) {
            return '我们的设备年运营成本控制在2万元以下，采用永磁技术，零液氦消耗，大大降低了维护和运营成本。';
        }
        
        if (message.includes('演示') || message.includes('申请')) {
            return '您可以通过以下方式申请演示：1. 拨打我们的服务热线 13501067352；2. 发送邮件至 info@spec-mri.com；3. 在网站留言。我们的专业团队会尽快与您联系安排演示。';
        }
        
        if (message.includes('价格') || message.includes('多少钱')) {
            return '设备价格会根据具体配置和需求有所不同，建议您联系我们的销售团队获取详细报价。您可以拨打 13501067352 或发送邮件咨询。';
        }
        
        if (message.includes('技术') || message.includes('参数')) {
            return 'AVT plus 0.3T 采用先进的永磁技术，磁场强度0.3T，配备AI智能成像算法，图像质量优异。具体技术参数可以查看我们的产品手册或联系技术团队。';
        }
        
        if (message.includes('售后') || message.includes('服务')) {
            return '我们提供全年345天开机保障，24小时技术支持热线，快速响应服务。设备保修期内免费维修，并提供专业培训服务。';
        }
        
        if (message.includes('安装') || message.includes('场地')) {
            return '由于设备重量轻（1-3吨），无需特殊的场地加固，普通医疗用房即可满足安装要求。我们的技术团队会全程协助安装调试。';
        }
        
        if (message.includes('应用') || message.includes('用途')) {
            return '设备广泛应用于宠物医疗的各个领域，包括头颅神经、脊柱关节、胸腹部、盆腔等部位的精准诊断，特别适合中小型宠物医院使用。';
        }
        
        if (message.includes('认证') || message.includes('标准')) {
            return '我们的产品已通过ISO9001质量管理体系认证，并符合相关医疗器械标准。部分产品还获得了CE认证，品质达到国际标准。';
        }
        
        if (message.includes('联系') || message.includes('电话')) {
            return '您可以通过以下方式联系我们：\n• 电话：王经理 13501067352\n• 邮箱：info@spec-mri.com\n• 地址：北京海淀区中关村软件园\n• 工作时间：周一至周五 9:00-18:00';
        }
        
        // 默认回复
        return '感谢您的咨询！我是斯派克的AI智能助手，可以帮您了解产品信息、技术参数、应用案例等。如果您有具体问题，请详细描述，我会为您提供专业的解答。';
    }

    // 发送按钮点击事件
    sendMessage.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message) {
            sendUserMessage(message);
            chatInput.value = '';
        }
    });

    // 回车发送消息
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = this.value.trim();
            if (message) {
                sendUserMessage(message);
                this.value = '';
            }
        }
    });

    // 快捷问题按钮
    quickQuestions.forEach(button => {
        button.addEventListener('click', function() {
            const question = this.textContent;
            sendUserMessage(question);
        });
    });

    // 添加CSS样式到页面
    const style = document.createElement('style');
    style.textContent = `
        .typing-dots {
            display: flex;
            gap: 4px;
            align-items: center;
        }
        
        .typing-dots span {
            width: 8px;
            height: 8px;
            background: var(--accent-color);
            border-radius: 50%;
            animation: typing 1.4s infinite ease-in-out;
        }
        
        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes typing {
            0%, 80%, 100% {
                transform: scale(0.8);
                opacity: 0.5;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        .navbar.scrolled {
            background: rgba(0, 51, 102, 0.95) !important;
            backdrop-filter: blur(20px);
            box-shadow: 0 5px 20px rgba(0, 51, 102, 0.3);
        }
    `;
    document.head.appendChild(style);

    // 滚动监听 - 更新导航栏活动状态
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 返回顶部按钮
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 添加返回顶部按钮样式
    const backToTopStyle = document.createElement('style');
    backToTopStyle.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: var(--white);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background: var(--accent-color);
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(backToTopStyle);

    // 表单验证和提交
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 简单的表单验证
            const name = this.querySelector('input[name="name"]')?.value;
            const email = this.querySelector('input[name="email"]')?.value;
            const message = this.querySelector('textarea[name="message"]')?.value;
            
            if (!name || !email || !message) {
                showNotification('请填写所有必填字段', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('请输入有效的邮箱地址', 'error');
                return;
            }
            
            // 模拟表单提交
            showNotification('消息发送成功！我们会尽快回复您。', 'success');
            this.reset();
        });
    }

    // 邮箱验证函数
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 通知系统
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => notification.classList.add('show'), 100);
        
        // 自动隐藏
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // 添加通知样式
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            max-width: 400px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            background: var(--accent-green);
        }
        
        .notification-error {
            background: #e74c3c;
        }
        
        .notification-info {
            background: var(--accent-color);
        }
    `;
    document.head.appendChild(notificationStyle);

    // 图片懒加载
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // 性能优化：防抖滚动事件
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 应用防抖到滚动事件
    const debouncedScrollHandler = debounce(function() {
        // 滚动相关的性能优化逻辑
    }, 16);

    window.addEventListener('scroll', debouncedScrollHandler);

    // 初始化完成
    console.log('斯派克官方网站初始化完成！');
});

// 页面加载完成后的额外初始化
window.addEventListener('load', function() {
    // 预加载关键资源
    const criticalImages = [
        'https://via.placeholder.com/600x400/003366/FFFFFF?text=AVT+plus+0.3T+MRI',
        'https://via.placeholder.com/500x400/003366/FFFFFF?text=AVT+plus+0.3T'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // 添加页面加载完成的动画
    document.body.classList.add('loaded');
    
    // 添加加载完成样式
    const loadedStyle = document.createElement('style');
    loadedStyle.textContent = `
        body.loaded {
            opacity: 1;
        }
        
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(loadedStyle);
});
