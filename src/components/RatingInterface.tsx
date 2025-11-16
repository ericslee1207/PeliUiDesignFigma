import { useState } from 'react';
import { Star, ArrowLeft, AlertCircle } from 'lucide-react';

interface RatingInterfaceProps {
  item: any;
  onBack: () => void;
  onSubmit: () => void;
}

export function RatingInterface({ item, onBack, onSubmit }: RatingInterfaceProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    // Simple profanity check demo
    const profanityWords = ['damn', 'hell', 'crap'];
    const hasProfanity = profanityWords.some((word) => comment.toLowerCase().includes(word));

    if (hasProfanity) {
      setError('Please remove inappropriate language from your comment');
      return;
    }

    // Success!
    alert('Rating submitted successfully! (In production, this would go through QC validation)');
    onSubmit();
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-5 h-5" />
        Back to Menu
      </button>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="mb-8">
          <h2 className="mb-2">Rate This Item</h2>
          <h3 className="text-gray-600 mb-1">{item?.name || 'Menu Item'}</h3>
          <p className="text-gray-500">
            {item?.hall} • {item?.meal}
          </p>
        </div>

        {/* Current Rating Display */}
        {item && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-blue-900 mb-2">Current Community Rating</p>
            <div className="flex items-center gap-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(item.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span>{item.rating.toFixed(1)}</span>
              <span className="text-gray-600">({item.numRatings} ratings)</span>
            </div>
          </div>
        )}

        {/* Rating Input */}
        <div className="mb-8">
          <label className="block mb-4">Your Rating *</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-12 h-12 ${
                    star <= (hoveredRating || rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="mt-2 text-gray-600">
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </p>
          )}
        </div>

        {/* Comment Input */}
        <div className="mb-8">
          <label className="block mb-2">
            Comment <span className="text-gray-500">(optional)</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              setError('');
            }}
            placeholder="Share your thoughts about this item..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
            rows={4}
          />
          <p className="mt-2 text-gray-500">
            {comment.length} / 500 characters • Comments are subject to quality control checks
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-yellow-900 mb-2">
            <strong>Important:</strong>
          </p>
          <ul className="space-y-1 text-yellow-800">
            <li>• You can only submit one rating per item per meal period</li>
            <li>• Ratings with profanity or inappropriate content will be rejected</li>
            <li>• Your rating will be anonymous and aggregated with others</li>
            <li>• Please be honest and constructive</li>
          </ul>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Submit Rating
          </button>
        </div>
      </div>

      {/* QC Process Info */}
      <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="mb-4">What Happens After You Submit?</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              1
            </div>
            <div>
              <p className="text-gray-600">
                <strong>Quality Control:</strong> Your submission is checked for duplicates, profanity, and valid
                formatting
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              2
            </div>
            <div>
              <p className="text-gray-600">
                <strong>Aggregation:</strong> If approved, your rating is combined with others to update the average
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              3
            </div>
            <div>
              <p className="text-gray-600">
                <strong>Display:</strong> The updated rating appears for all users to see
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
