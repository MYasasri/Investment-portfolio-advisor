// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const gameDisplay = document.getElementById('gameDisplay');
const newRecommendationButton = document.getElementById('newRecommendation');

// Portfolio recommendations database
const portfolios = [
    {
        name: "Conservative Growth",
        description: "A low-risk portfolio focused on stable returns through blue-chip stocks and government bonds. Ideal for investors seeking steady growth with minimal volatility.",
        riskLevel: "low",
        timeHorizon: "5-10 years",
        returnRate: "4-6%",
        category: "conservative",
        image: "conservative.jpg",
        allocation: "60% Bonds, 30% Large Cap Stocks, 10% Cash"
    },
    {
        name: "Balanced Income",
        description: "A balanced portfolio combining dividend stocks and corporate bonds for regular income. Suitable for investors looking for both growth and income.",
        riskLevel: "medium",
        timeHorizon: "3-5 years",
        returnRate: "6-8%",
        category: "balanced",
        image: "balanced.jpg",
        allocation: "40% Bonds, 40% Dividend Stocks, 20% REITs"
    },
    {
        name: "Aggressive Growth",
        description: "High-growth portfolio focusing on emerging markets and technology stocks. Best for investors with high risk tolerance and long-term goals.",
        riskLevel: "high",
        timeHorizon: "10+ years",
        returnRate: "10-12%",
        category: "aggressive",
        image: "aggressive.jpg",
        allocation: "70% Growth Stocks, 20% Emerging Markets, 10% Alternative Investments"
    },
    {
        name: "Retirement Income",
        description: "Portfolio designed for retirees seeking stable income with inflation protection. Focuses on dividend-paying stocks and inflation-protected securities.",
        riskLevel: "low",
        timeHorizon: "1-3 years",
        returnRate: "3-5%",
        category: "retirement",
        image: "retirement.jpg",
        allocation: "50% Dividend Stocks, 30% TIPS, 20% Short-term Bonds"
    },
    {
        name: "Tech Innovation",
        description: "Concentrated portfolio in technology and innovation sectors. High potential returns but with significant volatility.",
        riskLevel: "high",
        timeHorizon: "5-7 years",
        returnRate: "12-15%",
        category: "tech",
        image: "tech.jpg",
        allocation: "80% Tech Stocks, 15% Growth ETFs, 5% Cash"
    },
    {
        name: "Sustainable Growth",
        description: "ESG-focused portfolio investing in companies with strong environmental and social governance practices.",
        riskLevel: "medium",
        timeHorizon: "5-8 years",
        returnRate: "7-9%",
        category: "sustainable",
        image: "sustainable.jpg",
        allocation: "60% ESG Stocks, 30% Green Bonds, 10% Impact Investments"
    },
    {
        name: "Global Diversified",
        description: "Well-diversified portfolio across global markets and asset classes. Reduces country-specific risks while maintaining growth potential.",
        riskLevel: "medium",
        timeHorizon: "5-7 years",
        returnRate: "8-10%",
        category: "global",
        image: "global.jpg",
        allocation: "40% US Stocks, 30% International Stocks, 20% Bonds, 10% Commodities"
    },
    {
        name: "Dividend Aristocrats",
        description: "Portfolio focused on companies with long histories of increasing dividends. Provides growing income stream and capital appreciation.",
        riskLevel: "low",
        timeHorizon: "3-5 years",
        returnRate: "5-7%",
        category: "dividend",
        image: "dividend.jpg",
        allocation: "100% Dividend Growth Stocks"
    },
    {
        name: "Small Cap Value",
        description: "Concentrated portfolio in undervalued small-cap companies. Higher risk but potential for significant returns.",
        riskLevel: "high",
        timeHorizon: "5-7 years",
        returnRate: "11-13%",
        category: "value",
        image: "value.jpg",
        allocation: "70% Small Cap Stocks, 20% Mid Cap Stocks, 10% Cash"
    },
    {
        name: "Defensive Income",
        description: "Portfolio designed to perform well during market downturns. Focuses on defensive sectors and high-quality bonds.",
        riskLevel: "low",
        timeHorizon: "1-3 years",
        returnRate: "3-4%",
        category: "defensive",
        image: "defensive.jpg",
        allocation: "40% Consumer Staples, 40% Utilities, 20% Treasury Bonds"
    }
];

// Chat state
let chatState = {
    waitingForPreferences: true,
    preferences: {
        riskTolerance: null,
        timeHorizon: null,
        investmentGoal: null
    }
};

// Event Listeners
sendButton.addEventListener('click', handleUserMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserMessage();
    }
});
newRecommendationButton.addEventListener('click', startNewRecommendation);

// Functions
function handleUserMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, 'user');
        userInput.value = '';
        processUserMessage(message);
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    if (chatState.waitingForPreferences) {
        handlePreferenceInput(message);
    } else {
        if (lowerMessage.includes('yes') || lowerMessage.includes('another') || lowerMessage.includes('more')) {
            recommendPortfolio();
        } else if (lowerMessage.includes('no') || lowerMessage.includes('stop')) {
            setTimeout(() => {
                addMessage("Would you like to start over with new preferences?", 'bot');
            }, 1000);
        } else {
            setTimeout(() => {
                addMessage("Would you like to try another recommendation? (yes/no)", 'bot');
            }, 1000);
        }
    }
}

function handlePreferenceInput(message) {
    const lowerMessage = message.toLowerCase();
    
    if (!chatState.preferences.riskTolerance) {
        const riskLevels = ['low', 'medium', 'high'];
        const matchedRisk = riskLevels.find(risk => lowerMessage.includes(risk));
        
        if (matchedRisk) {
            chatState.preferences.riskTolerance = matchedRisk;
            setTimeout(() => {
                addMessage(`Great! You prefer ${matchedRisk} risk. What is your investment time horizon? (short: 1-3 years, medium: 3-7 years, long: 7+ years)`, 'bot');
            }, 1000);
        } else {
            setTimeout(() => {
                addMessage("What is your risk tolerance? (low, medium, high)", 'bot');
            }, 1000);
        }
    } else if (!chatState.preferences.timeHorizon) {
        const horizons = ['short', 'medium', 'long'];
        const matchedHorizon = horizons.find(horizon => lowerMessage.includes(horizon));
        
        if (matchedHorizon) {
            chatState.preferences.timeHorizon = matchedHorizon;
            setTimeout(() => {
                addMessage(`Got it! ${matchedHorizon} time horizon. What is your primary investment goal? (income, growth, balanced)`, 'bot');
            }, 1000);
        } else {
            setTimeout(() => {
                addMessage("Please specify your investment time horizon (short, medium, long)", 'bot');
            }, 1000);
        }
    } else if (!chatState.preferences.investmentGoal) {
        const goals = ['income', 'growth', 'balanced'];
        const matchedGoal = goals.find(goal => lowerMessage.includes(goal));
        
        if (matchedGoal) {
            chatState.preferences.investmentGoal = matchedGoal;
            recommendPortfolio();
        } else {
            setTimeout(() => {
                addMessage("Please choose your primary investment goal (income, growth, balanced)", 'bot');
            }, 1000);
        }
    }
}

function recommendPortfolio() {
    let recommendedPortfolios = portfolios.filter(portfolio => {
        return (
            (!chatState.preferences.riskTolerance || portfolio.riskLevel === chatState.preferences.riskTolerance) &&
            (!chatState.preferences.timeHorizon || portfolio.timeHorizon.includes(chatState.preferences.timeHorizon)) &&
            (!chatState.preferences.investmentGoal || portfolio.category.includes(chatState.preferences.investmentGoal))
        );
    });

    if (recommendedPortfolios.length === 0) {
        recommendedPortfolios = portfolios;
    }

    const recommendedPortfolio = recommendedPortfolios[Math.floor(Math.random() * recommendedPortfolios.length)];
    showPortfolioRecommendation(recommendedPortfolio);
    
    setTimeout(() => {
        addMessage(`Based on your preferences, I recommend the ${recommendedPortfolio.name} portfolio! Would you like to try another recommendation? (yes/no)`, 'bot');
    }, 1000);
}

function showPortfolioRecommendation(portfolio) {
    gameDisplay.innerHTML = `
        <div class="game-card">
            <img src="${portfolio.image}" alt="${portfolio.name}" style="width: 100%; height: 200px; object-fit: cover;">
            <h2>${portfolio.name}</h2>
            <p>${portfolio.description}</p>
            <div class="game-details">
                <span><i class="fas fa-chart-line"></i> Expected Return: ${portfolio.returnRate}</span>
                <span><i class="fas fa-clock"></i> Time Horizon: ${portfolio.timeHorizon}</span>
                <span><i class="fas fa-shield-alt"></i> Risk Level: ${portfolio.riskLevel}</span>
            </div>
            <div class="game-category">
                <span class="category-tag">${portfolio.category}</span>
                <span class="complexity-tag">${portfolio.allocation}</span>
            </div>
        </div>
    `;
    gameDisplay.classList.add('active');
}

function startNewRecommendation() {
    chatState = {
        waitingForPreferences: true,
        preferences: {
            riskTolerance: null,
            timeHorizon: null,
            investmentGoal: null
        }
    };

    gameDisplay.classList.remove('active');
    addMessage("Let's start a new portfolio recommendation! What is your risk tolerance? (low, medium, high)", 'bot');
}

// Update initial message
document.querySelector('.message.bot p').textContent = "Hello! I'm your portfolio advisor. I can help you find the perfect investment portfolio based on your preferences. What is your risk tolerance? (low, medium, high)";