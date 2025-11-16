import { useState } from 'react';
import { MapPin, List, Star, TrendingUp, Clock } from 'lucide-react';

interface MainInterfaceProps {
  onRateItem: (item: any) => void;
}

const MOCK_DATA = {
  diningHalls: ['Hill College House', 'Kings Court English House', 'McClelland Express', 'Lauder College House'],
  mealPeriods: ['Breakfast', 'Lunch', 'Dinner'],
  items: [
    {
      id: 'hill_pasta_001',
      name: 'Penne Pasta with Marinara',
      hall: 'Hill College House',
      meal: 'Lunch',
      rating: 4.2,
      numRatings: 15,
      confidence: 0.85,
      distribution: { 1: 0, 2: 1, 3: 2, 4: 7, 5: 5 },
    },
    {
      id: 'kings_pizza_001',
      name: 'Cheese Pizza',
      hall: 'Kings Court English House',
      meal: 'Dinner',
      rating: 3.8,
      numRatings: 22,
      confidence: 0.92,
      distribution: { 1: 1, 2: 2, 3: 6, 4: 8, 5: 5 },
    },
    {
      id: 'hill_french_001',
      name: 'French Toast',
      hall: 'Hill College House',
      meal: 'Breakfast',
      rating: 4.6,
      numRatings: 8,
      confidence: 0.72,
      distribution: { 1: 0, 2: 0, 3: 1, 4: 2, 5: 5 },
    },
    {
      id: 'mcclelland_salad_001',
      name: 'Caesar Salad',
      hall: 'McClelland Express',
      meal: 'Lunch',
      rating: 2.3,
      numRatings: 3,
      confidence: 0.45,
      distribution: { 1: 1, 2: 1, 3: 1, 4: 0, 5: 0 },
    },
  ],
};

export function MainInterface({ onRateItem }: MainInterfaceProps) {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedHall, setSelectedHall] = useState('all');
  const [selectedMeal, setSelectedMeal] = useState('all');

  const filteredItems = MOCK_DATA.items.filter((item) => {
    if (selectedHall !== 'all' && item.hall !== selectedHall) return false;
    if (selectedMeal !== 'all' && item.meal !== selectedMeal) return false;
    return true;
  });

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return { label: 'High', color: 'text-green-600 bg-green-50' };
    if (confidence >= 0.6) return { label: 'Medium', color: 'text-yellow-600 bg-yellow-50' };
    return { label: 'Low', color: 'text-red-600 bg-red-50' };
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2">Today's Menu</h1>
        <p className="text-gray-600">Thursday, November 14, 2025</p>
      </div>

      {/* Filters & View Toggle */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div>
              <label className="text-gray-600 mb-2 block">Dining Hall</label>
              <select
                value={selectedHall}
                onChange={(e) => setSelectedHall(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="all">All Dining Halls</option>
                {MOCK_DATA.diningHalls.map((hall) => (
                  <option key={hall} value={hall}>
                    {hall}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-gray-600 mb-2 block">Meal Period</label>
              <select
                value={selectedMeal}
                onChange={(e) => setSelectedMeal(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="all">All Meals</option>
                {MOCK_DATA.mealPeriods.map((meal) => (
                  <option key={meal} value={meal}>
                    {meal}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <List className="w-4 h-4" />
              List
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                viewMode === 'map' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Map
            </button>
          </div>
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const confidenceInfo = getConfidenceLabel(item.confidence);
            return (
              <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3>{item.name}</h3>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">{item.meal}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{item.hall}</span>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= Math.round(item.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span>{item.rating.toFixed(1)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <TrendingUp className="w-4 h-4" />
                        <span>{item.numRatings} ratings</span>
                      </div>

                      <div className={`px-3 py-1 rounded-full ${confidenceInfo.color}`}>
                        {confidenceInfo.label} Confidence
                      </div>
                    </div>

                    {/* Rating Distribution */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        {Object.entries(item.distribution).map(([rating, count]) => (
                          <div key={rating} className="flex items-center gap-1">
                            <span className="text-gray-600">{rating}★</span>
                            <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500"
                                style={{ width: `${(count / item.numRatings) * 100}%` }}
                              />
                            </div>
                            <span className="text-gray-500">({count})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRateItem(item)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Rate This Item
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Map View */}
      {viewMode === 'map' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-6">
            <div className="text-center text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-2" />
              <p>Interactive Map View</p>
              <p>(Google Maps integration)</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {MOCK_DATA.diningHalls.map((hall) => {
              const hallItems = MOCK_DATA.items.filter((item) => item.hall === hall);
              const avgRating =
                hallItems.reduce((sum, item) => sum + item.rating, 0) / hallItems.length || 0;

              return (
                <div key={hall} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="mb-2">{hall}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span>{avgRating.toFixed(1)} avg</span>
                  </div>
                  <p className="text-gray-600">{hallItems.length} items today</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Instructions Card */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-blue-900 mb-2">How to Use Peli</h3>
            <ul className="space-y-2 text-blue-800">
              <li>• Browse today's menu items across all dining halls</li>
              <li>• Check ratings and confidence scores before swiping in</li>
              <li>• Rate items after you've tried them (one rating per item per meal period)</li>
              <li>• Help fellow students make informed dining decisions!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
