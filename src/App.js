import { FormControl, FormControlLabel, FormHelperText, InputAdornment, OutlinedInput, Radio, RadioGroup } from '@mui/material';
import manEatingImgSrc from './assets/images/image-man-eating.webp';
import iconExercise from './assets/images/icon-exercise.svg';
import iconEating from './assets/images/icon-eating.svg';
import iconSleep from './assets/images/icon-sleep.svg';
import iconAge from './assets/images/icon-age.svg';
import iconGender from './assets/images/icon-gender.svg';
import iconMuscle from './assets/images/icon-muscle.svg';
import iconPregnancy from './assets/images/icon-pregnancy.svg';
import logo from './assets/images/logo.svg';
import iconRace from './assets/images/icon-race.svg';
import classes from './App.module.scss';
import { useEffect, useState } from 'react';
import classnames from 'classnames';

const HEALTH_IMPROVEMENT_TIPS = [
  {
    title: 'Healthy Eating',
    subText: 'Healthy eating promotes weight control, disease prevention, better digestion, immunity, mental clarity, and mood.',
    icon: iconEating,
  },
  {
    title: 'Regular Exercise',
    subText: 'Exercise improves fitness, aids weight control, elevates mood, and reduces disease risk, fostering wellness and longevity.',
    icon: iconExercise,
  },
  {
    title: 'Adequate Sleep',
    subText: 'Sleep enhances mental clarity, emotional stability, and physical wellness, promoting overall restoration and rejuvenation.',
    icon: iconSleep,
  }
]

const METRIC_BMI_RANGES = {
  '18.5': "Your BMI suggests you’re underweight. Your ideal weight should be between ",
  '24.9': "Your BMI suggests you’re a healthy weight. Your ideal weight is between ",
  '29.9': "Your BMI suggests you’re overweight. Your ideal weight should be between ",
  '30': "A BMI of 30 or higher is considered obese. Your ideal weight should be between ",
}

const LIMITATIONS = [
  {
    title: 'Limitations of BMI',
    subText: "Although BMI is often a practical indicator of healthy weight, it is not suited for every person. Specific groups should carefully consider their BMI outcomes, and in certain cases, the measurement may not be beneficial to use.",
    isSectionTitle: true,
  },
  {
    title: 'Gender',
    subText: "The development and body fat composition of girls and boys vary with age. Consequently, a child's age and gender are considered when evaluating their BMI.",
    icon: iconGender,
  },
  {
    title: 'Age',
    subText: "In aging individuals, increased body fat and muscle loss may cause BMI to underestimate body fat content.",
    icon: iconAge,
  },
  {
    title: 'Muscle',
    subText: "BMI may misclassify muscular individuals as overweight or obese, as it doesn't differentiate muscle from fat.",
    icon: iconMuscle,
  },
  {
    title: 'Pregnancy',
    subText: "Expectant mothers experience weight gain due to their growing baby. Maintaining a healthy pre-pregnancy BMI is advisable to minimise health risks for both mother and child.",
    icon: iconPregnancy,
  },
  {
    title: 'Race',
    subText: "Certain health concerns may affect individuals of some Black and Asian origins at lower BMIs than others. To learn more, it is advised to discuss this with your GP or practice nurse.",
    icon: iconRace,
  },
]

function App() {
  const [value, setValue] = useState('metric');
  const [height, setHeight] = useState({});
  const [weight, setWeight] = useState({});
  const [bmiValue, setBmiValue] = useState(null);
  const handleChange = event => {
    setValue(event.target.value); 
    setBmiValue(null);
    setHeight(null);
    setWeight(null);
  }

  const onSetMetricBmiRange = (bmiOutput) => {
    if (bmiOutput > 0) {
      const filteredKeys = Object.keys(METRIC_BMI_RANGES)?.filter(key =>  parseFloat(key) < bmiOutput);
      const maxRanges = [...filteredKeys, Object.keys(METRIC_BMI_RANGES)[filteredKeys.length + 1]];
      const maxRange = Math.max(...maxRanges);
      setBmiValue({
        value: bmiOutput,
        title: METRIC_BMI_RANGES[maxRange],
        subText: value === 'metric' ? '63.3kgs - 85.2kgs' : '9st 6lbs - 12st 10lbs'
      });
    }
  }

  useEffect(() => {
    if (bmiValue) {
      setBmiValue(null);
    }
    let bmiOutput = 0;
    if (value === 'metric' && height?.cm && weight?.kg) {
      const heightInMeters = height.cm / 100;
      bmiOutput = (weight.kg / (heightInMeters * heightInMeters)).toFixed(1);
    }

    if (value === 'imperial' && height?.inch && height?.ft && weight?.st && weight?.lbs) {
      const actualHeight = (height.ft * 12) + height.inch; 
      const actualWeight = (weight.st * 14) + weight.lbs;
      bmiOutput = ((actualWeight * 703) / (actualHeight * actualHeight)).toFixed(1);
    }
    
    bmiOutput = Number(bmiOutput);
    if (bmiOutput > 0) {
      onSetMetricBmiRange(bmiOutput);
    }
  }, [height, value, weight]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
          <div className={classes.header__content}>
            <img alt="icon" src={logo} className={classes.logo} />
            <p className={classes.header__content_title}>Body Mass Index Calculator</p>
            <p className={classes.header__content_subtext}>Better understand your weight in relation to your height using our body mass index (BM) calculator. While BMI is not the sole determinant of a healthy weight, it offers a valuable starting point to evaluate your overall health and well-being.</p>
          </div>
      </div>
      <div className={classnames(classes.details, {
        [classes.details_imperial]: value === 'imperial'
      })}>
        <h5 className={classes.details__title}>Enter your details below</h5>
        <FormControl className={classes.details__formControl}>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
            className={classes.details__radioGroup}
          >
            <FormControlLabel  className={classes.details__radioGroup_item} value="metric" control={<Radio className={classes.radio} />} label="Metric" />
            <FormControlLabel  className={classes.details__radioGroup_item} value="imperial" control={<Radio className={classes.radio} />} label="Imperial" />
          </RadioGroup>
        </FormControl>
        <div className={classnames(classes.formInputs, {
          [classes.formInputs_imperial]: value === 'imperial'
        })}>
          <FormControl sx={{ m: 1 }} variant="outlined" className={classnames(classes.formControl, {
            [classes.formControl_imperial]: value === 'imperial'
          })}>
            <FormHelperText id="outlined-weight-helper-text" className={classes.formControl__helperText}>Height</FormHelperText>
            <div className={classnames({
              [classes.imperial]: value === 'imperial'
            })}>
            <OutlinedInput
              id="outlined-adornment-weight"
              {...(!height && {value: ''})}
              endAdornment={<InputAdornment className={classes.endAdornment} position="end">{value === 'imperial' ? 'ft' : 'cm'}</InputAdornment>}
              className={classes.formControl__outlinedInput}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              onInput={(e) => setHeight({...height, [value === 'imperial' ? 'ft' : 'cm']: Number(e.target.value) })}
            />
            {value === 'imperial' && <OutlinedInput
              id="outlined-adornment-weight"
              endAdornment={<InputAdornment className={classes.endAdornment} position="end">in</InputAdornment>}
              className={classes.formControl__outlinedInput}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              onInput={(e) => setHeight({...height, 'inch': Number(e.target.value) })}
            />}
            </div>
          </FormControl>
          <FormControl sx={{ m: 1 }} variant="outlined" className={classnames(classes.formControl, {
            [classes.formControl_imperial]: value === 'imperial'
          })}>
            <FormHelperText id="outlined-weight-helper-text" className={classes.formControl__helperText}>Weight</FormHelperText>
            <div className={classnames({
              [classes.imperial]: value === 'imperial'
            })}>
              <OutlinedInput
                id="outlined-adornment-weight"
                {...(!weight && {value: ''})}
                endAdornment={<InputAdornment className={classes.endAdornment} position="end">{value === 'imperial' ? 'st' : 'kg'}</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                className={classes.formControl__outlinedInput}
                inputProps={{
                  'aria-label': 'weight',
                }}
                onInput={(e) => setWeight({...weight,  [value === 'imperial' ? 'st' : 'kg']: Number(e.target.value) })}
              />
              {value === 'imperial' && <OutlinedInput
                id="outlined-adornment-weight"
                endAdornment={<InputAdornment className={classes.endAdornment} position="end">lbs</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                className={classes.formControl__outlinedInput}
                inputProps={{
                  'aria-label': 'weight',
                }}
                onInput={(e) => setWeight({...weight, 'lbs': Number(e.target.value) })}
              />}
            </div>
          </FormControl>
        </div>
        {bmiValue ? (<div className={classes.bmiOutput}>
            <div className={classes.bmiOutput__result}>
                <span className={classes.bmiOutput__result_label}>Your bmi is...</span>
                <p className={classes.bmiOutput__result_value}>{bmiValue?.value}</p>
            </div>
            <div className={classes.bmiOutput__analysis}>
                <span>{bmiValue?.title}<strong>{bmiValue?.subText}</strong>.</span>
            </div>
        </div>) : (<div className={classnames(classes.bmiOutput, classes.welcome)}>
          <div className={classes.bmiOutput__withoutResult}>
            <span className={classes.bmiOutput__result_label}>Welcome</span>
            <span className={classes.bmiOutput__withoutResult_label}>Enter your height and weight and you will see your BMI result here</span>
          </div>
        </div>)}
      </div>
      <div className={classnames(classes.thirdSection,  {
        [classes.thirdSection_imperial]: value === 'imperial'
      })}>
        <img alt="man-eating" src={manEatingImgSrc} className={classes.thirdSection__image}  />
        <div className={classes.thirdSection__description}>
          <span className={classes.thirdSection__description_title}>What your BMI result means</span>
          <span className={classes.thirdSection__description_subText}>A BMI range of 18.5 to 24.9 is considered a 'healthy weight.' Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced fat and sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a week.</span>
        </div>
      </div>
      <div className={classes.healthImprovementSection}> 
        {HEALTH_IMPROVEMENT_TIPS.map((tip, index) => (
          <div key={index} className={classes.healthImprovementSection__item}>
            <img alt="icon" src={tip.icon} height={64} width={64} />
            <div>
              <p className={classes.healthImprovementSection__item_title}>{tip.title}</p>
              <p className={classes.healthImprovementSection__item_subText}>{tip.subText}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={classes.limitations}>
        {LIMITATIONS.map((limitation, index) => (
           <div key={index} className={classnames(classes.limitations__item, classes[limitation.title.toLowerCase()], {
              [classes.limitations__sectionTitle]: limitation.isSectionTitle
           })}>
            <div className={classes.limitations__item_heading}>
              {limitation.icon && <img alt="icon" src={limitation.icon} height={64} width={64} />}
              <span className={classnames(classes.limitations__item_heading_title, {
                  [classes.limitations__sectionTitle_title]: limitation.isSectionTitle
                })}>{limitation.title}
              </span>
            </div>
            <p className={classnames(classes.limitations__item_subText, classes.headerSubtext)}>{limitation.subText}</p>
            
         </div>
        ))}
        
      </div>
    </div>
  );
}

export default App;
