import { useState } from 'react';
import './styles/main.scss';

function App() {
  const data = [
    {
      views: '10K pageviews',
      price: '8',
    },
    {
      views: '50K pageviews',
      price: '12',
    },
    {
      views: '100K pageviews',
      price: '16',
    },
    {
      views: '500k pageviews',
      price: '24',
    },
    {
      views: '1M pageviews',
      price: '36',
    },
  ];
  const discountAmount = 25;
  const [discountSelected, setDiscountSelected] = useState(0);
  const [tier, setTier] = useState(1);
  const [isAnimated, setIsAnimated] = useState(false);

  const handleRange = (event) => {
    setTier(event.target.value);
    setIsAnimated(true);
  };

  const handleDiscount = (event) => {
    event.target.checked
      ? setDiscountSelected(discountAmount)
      : setDiscountSelected(0);

    setIsAnimated(true);
  };

  const handleAnimationEnd = () => {
    setIsAnimated(false);
  };

  const result = parseFloat(
    ((100 - discountSelected) / 100) * data[tier].price
  ).toFixed(2);

  const percentage = 100 / (data.length - 1);
  document.documentElement.style.setProperty(
    '--percentageWidth',
    `${tier * percentage}%`
  );

  return (
    <>
      <main className='container'>
        <div className='intro'>
          <h1 className='heading'>Simple, traffic-based pricing</h1>
          <p>Sign-up for our 30-day trial. No credit card required.</p>
        </div>

        <div className='card'>
          <div className='card__calculation'>
            <div className='card__slider'>
              <div className='pageviews'>{data[tier].views}</div>
              <input
                className='range-slider'
                type='range'
                min='0'
                max='4'
                step='1'
                value={tier}
                onInput={handleRange}
              />
              <div className='price'>
                <span
                  className={`price__amount ${
                    isAnimated ? 'animation__pulse' : ''
                  }`}
                  onAnimationEnd={handleAnimationEnd}
                >
                  ${result}
                </span>{' '}
                / month
              </div>
            </div>
            <label className='toggle'>
              <div className='text-right'>Monthly Billing</div>
              <div className='switch'>
                <input
                  type='checkbox'
                  name=''
                  id=''
                  role='switch'
                  onClick={handleDiscount}
                  className='sr-only'
                />
              </div>
              <div className='text-left'>
                Yearly Billing
                <span className='pill'>
                  <span className='hide-tablet'>-</span>
                  {discountAmount}%{' '}
                  <span className='hide-mobile'>discount</span>
                </span>
              </div>
            </label>
          </div>
          <div className='card__footer'>
            <ul className='list'>
              <li>Unlimited websites</li>
              <li>100% data ownership</li>
              <li>Email reports</li>
            </ul>
            <a href='#' className='btn'>
              Start my trial
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
