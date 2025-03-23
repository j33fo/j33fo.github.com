// DOM Elements
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const terminalInput = document.querySelector('.terminal-input');
const terminalOutput = document.querySelector('.terminal-output');
const loadingScreen = document.querySelector('.loading-screen');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
});

// Intersection Observer for section animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all sections
sections.forEach(section => observer.observe(section));

// Navigation active state
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Terminal functionality
const commands = {
    help: () => {
        return `
Available commands:
- help: Show this help message
- clear: Clear the terminal
- about: Show information about me
- skills: List my skills
- contact: Show contact information
- github: Open my GitHub profile
- theme: Toggle dark/light theme
        `;
    },
    clear: () => {
        terminalOutput.innerHTML = '';
        return '';
    },
    about: () => {
        return `
I am Gabriel Tampu, a Computer Science student at the University of Bedfordshire.
I have been passionate about computing since the 2000s and love creating
innovative solutions to real-world problems.
        `;
    },
    skills: () => {
        return `
My skills include:
- Programming: HTML/CSS, JavaScript, Python, SQL, C#
- Technologies: Various frameworks and tools
- Languages: Romanian (Native), English, Others (Basic)
        `;
    },
    contact: () => {
        return `
You can reach me through:
- GitHub: github.com/j33fo
- Email: [Your email]
- LinkedIn: [Your LinkedIn]
        `;
    },
    github: () => {
        window.open('https://github.com/j33fo', '_blank');
        return 'Opening GitHub profile...';
    },
    theme: () => {
        document.body.classList.toggle('light-theme');
        return 'Theme toggled!';
    }
};

// Handle terminal input
terminalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const command = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';
        
        const output = document.createElement('div');
        output.textContent = `$ ${command}`;
        terminalOutput.appendChild(output);
        
        if (commands[command]) {
            const response = document.createElement('div');
            response.textContent = commands[command]();
            terminalOutput.appendChild(response);
        } else if (command !== '') {
            const error = document.createElement('div');
            error.textContent = `Command not found: ${command}. Type 'help' for available commands.`;
            terminalOutput.appendChild(error);
        }
        
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus terminal
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        terminalInput.focus();
    }
}); 