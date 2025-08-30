import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface GameCard {
  id: number;
  name: string;
  image: string;
  rarity: 'common' | 'rare' | 'legendary';
  level: number;
  power: number;
  description: string;
  owned: boolean;
}

interface Player {
  id: number;
  name: string;
  level: number;
  cards: number;
  rating: number;
  avatar: string;
}

interface NewsItem {
  id: number;
  title: string;
  date: string;
  type: 'update' | 'event' | 'trade';
  description: string;
}

const gameCards: GameCard[] = [
  {
    id: 1,
    name: "Мистический Страж",
    image: "/img/7a657c16-4fab-4fea-9f9d-3100cc09fe3b.jpg",
    rarity: "rare",
    level: 25,
    power: 850,
    description: "Древний защитник магических артефактов",
    owned: true
  },
  {
    id: 2,
    name: "Огненный Дракон",
    image: "/img/31d537ef-91bc-46cf-871b-5089533c6508.jpg",
    rarity: "legendary",
    level: 45,
    power: 1200,
    description: "Повелитель пламени и разрушения",
    owned: false
  },
  {
    id: 3,
    name: "Храбрый Воин",
    image: "/img/a3745ded-efbf-41f0-9af9-17957bff376f.jpg",
    rarity: "common",
    level: 10,
    power: 300,
    description: "Отважный боец ближнего боя",
    owned: true
  },
  {
    id: 4,
    name: "Лесной Эльф",
    image: "/img/7a657c16-4fab-4fea-9f9d-3100cc09fe3b.jpg",
    rarity: "rare",
    level: 20,
    power: 650,
    description: "Мастер стрельбы из лука",
    owned: true
  },
  {
    id: 5,
    name: "Теневой Убийца",
    image: "/img/a3745ded-efbf-41f0-9af9-17957bff376f.jpg",
    rarity: "legendary",
    level: 35,
    power: 950,
    description: "Невидимый охотник во тьме",
    owned: false
  },
  {
    id: 6,
    name: "Морской Пират",
    image: "/img/a3745ded-efbf-41f0-9af9-17957bff376f.jpg",
    rarity: "common",
    level: 8,
    power: 250,
    description: "Отважный покоритель морей",
    owned: true
  }
];

const topPlayers: Player[] = [
  { id: 1, name: "DragonMaster", level: 78, cards: 245, rating: 2150, avatar: "🐉" },
  { id: 2, name: "ShadowHunter", level: 65, cards: 189, rating: 1980, avatar: "🗡️" },
  { id: 3, name: "MysticWizard", level: 59, cards: 167, rating: 1850, avatar: "🔮" },
  { id: 4, name: "FireKnight", level: 52, cards: 134, rating: 1720, avatar: "🔥" },
  { id: 5, name: "IceQueen", level: 48, cards: 125, rating: 1650, avatar: "❄️" }
];

const news: NewsItem[] = [
  {
    id: 1,
    title: "Новая коллекция 'Драконы Севера'",
    date: "2024-12-15",
    type: "update",
    description: "Добавлено 50 новых карт с ледяными драконами и северными воинами"
  },
  {
    id: 2,
    title: "Турнир Легенд начинается!",
    date: "2024-12-10",
    type: "event",
    description: "Примите участие в еженедельном турнире за эксклюзивные награды"
  },
  {
    id: 3,
    title: "Успешная сделка: Огненный Дракон",
    date: "2024-12-08",
    type: "trade",
    description: "Игрок MasterTrader обменял легендарную карту на 3 редкие карты"
  }
];

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'legendary': return 'from-legendary/20 to-legendary/40 border-legendary';
    case 'rare': return 'from-rare/20 to-rare/40 border-rare';
    default: return 'from-common/20 to-common/40 border-common';
  }
};

const getRarityBadgeColor = (rarity: string) => {
  switch (rarity) {
    case 'legendary': return 'bg-legendary text-white';
    case 'rare': return 'bg-rare text-white';
    default: return 'bg-common text-white';
  }
};

const CardComponent = ({ card }: { card: GameCard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${
        card.rarity === 'legendary' ? 'animate-glow' : ''
      }`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <Card className={`bg-gradient-to-br ${getRarityColor(card.rarity)} border-2 overflow-hidden ${
        isFlipped ? 'animate-card-flip' : ''
      }`}>
        <CardHeader className="p-3 pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-bold text-foreground">{card.name}</CardTitle>
            <Badge className={getRarityBadgeColor(card.rarity)}>
              {card.rarity === 'legendary' ? 'Легенда' : card.rarity === 'rare' ? 'Редкая' : 'Обычная'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-muted">
            <img 
              src={card.image} 
              alt={card.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Уровень: {card.level}</span>
              <span className="text-muted-foreground">Сила: {card.power}</span>
            </div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Icon name={card.owned ? "Check" : "X"} size={16} />
                <span className="text-xs">{card.owned ? "В коллекции" : "Не найдена"}</span>
              </div>
              {!card.owned && (
                <Button size="sm" variant="outline" className="text-xs h-6 px-2">
                  Обменять
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function Index() {
  const [activeTab, setActiveTab] = useState("collection");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Zap" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CARD COLLECTOR
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Coins" size={16} />
                <span>1,250 монет</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Trophy" size={16} />
                <span>Уровень 42</span>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Icon name="User" size={16} />
                Профиль
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card/30 border-b border-border">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-7 bg-transparent gap-2 h-12">
              <TabsTrigger value="home" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Home" size={16} />
                Главная
              </TabsTrigger>
              <TabsTrigger value="collection" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Library" size={16} />
                Коллекция
              </TabsTrigger>
              <TabsTrigger value="catalog" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Grid3x3" size={16} />
                Каталог
              </TabsTrigger>
              <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="User" size={16} />
                Профиль
              </TabsTrigger>
              <TabsTrigger value="trade" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="ArrowLeftRight" size={16} />
                Обмен
              </TabsTrigger>
              <TabsTrigger value="rating" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Trophy" size={16} />
                Рейтинг
              </TabsTrigger>
              <TabsTrigger value="news" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Newspaper" size={16} />
                Новости
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Home Tab */}
          <TabsContent value="home" className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Добро пожаловать в мир карточных коллекций!
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Собирайте, обменивайтесь и сражайтесь с уникальными картами. Откройте для себя легендарных существ и станьте лучшим коллекционером!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/20 border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Library" size={24} />
                    Моя коллекция
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">142 карты</div>
                  <p className="text-sm text-muted-foreground">
                    Из них 8 легендарных, 34 редких
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/20 border-secondary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={24} />
                    Рейтинг
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-secondary mb-2">#127</div>
                  <p className="text-sm text-muted-foreground">
                    В топ-500 игроков мира
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/10 to-accent/20 border-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="ArrowLeftRight" size={24} />
                    Активные обмены
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-accent mb-2">3</div>
                  <p className="text-sm text-muted-foreground">
                    Ожидают вашего ответа
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Featured Cards */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">🔥 Карты дня</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {gameCards.slice(0, 3).map(card => (
                  <CardComponent key={card.id} card={card} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Collection Tab */}
          <TabsContent value="collection" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Моя коллекция</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="Filter" size={16} />
                  Фильтры
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="ArrowUpDown" size={16} />
                  Сортировка
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {gameCards.map(card => (
                <CardComponent key={card.id} card={card} />
              ))}
            </div>
          </TabsContent>

          {/* Catalog Tab */}
          <TabsContent value="catalog" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Каталог карт</h2>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-common/20 border-common">
                  Обычные: 1,247
                </Badge>
                <Badge variant="outline" className="bg-rare/20 border-rare">
                  Редкие: 342
                </Badge>
                <Badge variant="outline" className="bg-legendary/20 border-legendary">
                  Легендарные: 89
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {gameCards.map(card => (
                <CardComponent key={card.id} card={card} />
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl">
                    🎮
                  </div>
                  <div>
                    <CardTitle className="text-2xl">GameMaster2024</CardTitle>
                    <p className="text-muted-foreground">Уровень 42 • Коллекционер</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">142</div>
                  <div className="text-sm text-muted-foreground">Карт в коллекции</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">1,850</div>
                  <div className="text-sm text-muted-foreground">Рейтинг</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">23</div>
                  <div className="text-sm text-muted-foreground">Успешных обменов</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-rare">87%</div>
                  <div className="text-sm text-muted-foreground">Завершенность</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trade Tab */}
          <TabsContent value="trade" className="space-y-6">
            <h2 className="text-3xl font-bold">Торговая площадка</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="ArrowUp" size={20} />
                    Мои предложения
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <img src="/img/7a657c16-4fab-4fea-9f9d-3100cc09fe3b.jpg" alt="" className="w-12 h-12 rounded object-cover" />
                      <div>
                        <div className="font-medium">Мистический Страж</div>
                        <div className="text-sm text-muted-foreground">За Огненного Дракона</div>
                      </div>
                    </div>
                    <Badge variant="outline">Ожидает</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="ArrowDown" size={20} />
                    Входящие предложения
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <img src="/img/a3745ded-efbf-41f0-9af9-17957bff376f.jpg" alt="" className="w-12 h-12 rounded object-cover" />
                      <div>
                        <div className="font-medium">2x Храбрый Воин</div>
                        <div className="text-sm text-muted-foreground">За вашего Лесного Эльфа</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Icon name="X" size={14} />
                      </Button>
                      <Button size="sm">
                        <Icon name="Check" size={14} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Rating Tab */}
          <TabsContent value="rating" className="space-y-6">
            <h2 className="text-3xl font-bold">Рейтинг игроков</h2>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Crown" size={24} className="text-legendary" />
                  Топ коллекционеров
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPlayers.map((player, index) => (
                    <div key={player.id} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/70 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? 'bg-legendary text-white' : 
                          index === 1 ? 'bg-rare text-white' : 
                          index === 2 ? 'bg-common text-white' : 'bg-muted-foreground/20'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="text-2xl">{player.avatar}</div>
                        <div>
                          <div className="font-medium">{player.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Уровень {player.level} • {player.cards} карт
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{player.rating}</div>
                        <div className="text-sm text-muted-foreground">рейтинг</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news" className="space-y-6">
            <h2 className="text-3xl font-bold">Новости и события</h2>
            
            <div className="space-y-4">
              {news.map(item => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Icon 
                          name={
                            item.type === 'update' ? 'Zap' :
                            item.type === 'event' ? 'Calendar' : 'ArrowLeftRight'
                          } 
                          size={20} 
                        />
                        {item.title}
                      </CardTitle>
                      <Badge variant={
                        item.type === 'update' ? 'default' :
                        item.type === 'event' ? 'secondary' : 'outline'
                      }>
                        {item.type === 'update' ? 'Обновление' :
                         item.type === 'event' ? 'Событие' : 'Обмен'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-2">{item.description}</p>
                    <div className="text-sm text-muted-foreground">
                      <Icon name="Clock" size={14} className="inline mr-1" />
                      {item.date}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Zap" size={20} className="text-primary" />
            <span className="font-bold">CARD COLLECTOR</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Лучшая платформа для коллекционирования игровых карт
          </p>
        </div>
      </footer>
    </div>
  );
}