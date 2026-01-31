import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import LengthConverter from './pages/LengthConverter';
import WeightConverter from './pages/WeightConverter';
import LoanCalculator from './pages/LoanCalculator';
import DateCalculator from './pages/DateCalculator';
import WordCounter from './pages/WordCounter';
import CurrencyConverter from './pages/CurrencyConverter';
import UnicodeConverter from './pages/UnicodeConverter';
import LottoGenerator from './pages/LottoGenerator';
import SpecialCharacters from './pages/SpecialCharacters';
import AsciiTable from './pages/AsciiTable';
import ColorPicker from './pages/ColorPicker';
import IpAddress from './pages/IpAddress';
import Flashlight from './pages/Flashlight';
import QrGenerator from './pages/QrGenerator';
import BarcodeGenerator from './pages/BarcodeGenerator';
import StringConverter from './pages/StringConverter';
import HtmlFormatter from './pages/HtmlFormatter';
import CodeDiff from './pages/CodeDiff';
import Checklist from './pages/Checklist';
import WebEditor from './pages/WebEditor';
import ImageToBase64 from './pages/ImageToBase64';
import AsciiArt from './pages/AsciiArt';
import Base64Tool from './pages/Base64Tool';
import PasswordGenerator from './pages/PasswordGenerator';
import BloodType from './pages/BloodType';
import JsonFormatter from './pages/JsonFormatter';
import WorkHoursCalculator from './pages/WorkHoursCalculator';
import SalaryCalculator from './pages/SalaryCalculator';
import HashGenerator from './pages/HashGenerator';
import UuidGenerator from './pages/UuidGenerator';
import AgeCalculator from './pages/AgeCalculator';
import CompoundInterestCalculator from './pages/CompoundInterestCalculator';
import HtmlEncoder from './pages/HtmlEncoder';
import TimerStopwatch from './pages/TimerStopwatch';
import MbtiTest from './pages/MbtiTest';
import ImageResizer from './pages/ImageResizer';
import BaseConverter from './pages/BaseConverter';
import YoutubeThumbnail from './pages/YoutubeThumbnail';
import MarkdownEditor from './pages/MarkdownEditor';
import Saju from './pages/Saju';
import ZodiacFortune from './pages/ZodiacFortune';
import Horoscope from './pages/Horoscope';
import DreamInterpretation from './pages/DreamInterpretation';
import Biorhythm from './pages/Biorhythm';
import BirthGen from './pages/BirthGen';
import NameAnalysis from './pages/NameAnalysis';
import BMI from './pages/BMI';
import BMR from './pages/BMR';
import ReactionTest from './pages/ReactionTest';
import TypingTest from './pages/TypingTest';


import TarotCard from './pages/TarotCard';
import TemperatureConverter from './pages/TemperatureConverter';
import UrlEncoderDecoder from './pages/UrlEncoderDecoder';
import JwtDecoder from './pages/JwtDecoder';
import RegexTester from './pages/RegexTester';
import PomodoroTimer from './pages/PomodoroTimer';
import OneToFifty from './pages/OneToFifty';
import CpsTest from './pages/CpsTest';
import AimTrainer from './pages/AimTrainer';
import NumberMemory from './pages/NumberMemory';
import NumberBaseball from './pages/NumberBaseball';
import Minesweeper from './pages/Minesweeper';
import Roulette from './pages/Roulette';
import LadderGame from './pages/LadderGame';
import CronGenerator from './pages/CronGenerator';
import CsvJsonConverter from './pages/CsvJsonConverter';
import DiscountCalculator from './pages/DiscountCalculator';
import ColorExtractor from './pages/ColorExtractor';
import AreaConverter from './pages/AreaConverter';
import VolumeConverter from './pages/VolumeConverter';
import SpeedConverter from './pages/SpeedConverter';
import WorldClock from './pages/WorldClock';
import PercentCalculator from './pages/PercentCalculator';
import FractionCalculator from './pages/FractionCalculator';
import EncryptionTool from './pages/EncryptionTool';
import DiceRoller from './pages/DiceRoller';
import LunchRecommender from './pages/LunchRecommender';
import SeveranceCalculator from './pages/SeveranceCalculator';
import MinimumWageCalculator from './pages/MinimumWageCalculator';
import SuikaGame from './pages/SuikaGame';
import Game2048 from './pages/Game2048';
import TanghuluGame from './pages/TanghuluGame';
import FlappyBird from './pages/FlappyBird';
import MissileDodge from './pages/MissileDodge';
import SnakeGame from './pages/SnakeGame';
import Sudoku from './pages/Sudoku';
import TowerStacker from './pages/TowerStacker';


import PersonalColor from './pages/PersonalColor';
import PastLife from './pages/PastLife';
import PetMbti from './pages/PetMbti';
import MentalAge from './pages/MentalAge';
import BrainStructure from './pages/BrainStructure';
import JoseonJob from './pages/JoseonJob';
import IfIAmGod from './pages/IfIAmGod';
import FirstImpressionColor from './pages/FirstImpressionColor';
import AnimalFace from './pages/AnimalFace';
import PersonalScent from './pages/PersonalScent';
import IdealType from './pages/IdealType';
import CoupleCompatibility from './pages/CoupleCompatibility';
import HiddenTalent from './pages/HiddenTalent';
import BalanceGame from './pages/BalanceGame';
import FortuneCookie from './pages/FortuneCookie';
import ColorTest from './pages/ColorTest';
import SpeedMath from './pages/SpeedMath';
import BubbleWrap from './pages/BubbleWrap';
import HearingTest from './pages/HearingTest';
import SpellingQuiz from './pages/SpellingQuiz';
import TimeSense from './pages/TimeSense';
import PitchTest from './pages/PitchTest';
import CapitalQuiz from './pages/CapitalQuiz';
import TypingDefense from './pages/TypingDefense';
import VocabularyTest from './pages/VocabularyTest';
import DynamicAcuity from './pages/DynamicAcuity';
import Hangman from './pages/Hangman';
import MorseCode from './pages/MorseCode';
import SmileDatingTest from './pages/SmileDatingTest';
import DatingTest from './pages/DatingTest';
import StressTest from './pages/StressTest';
import BrainType from './pages/BrainType';
import EqTest from './pages/EqTest';
import SmartphoneAddiction from './pages/SmartphoneAddiction';
import KkondaeTest from './pages/KkondaeTest';
import HoguTest from './pages/HoguTest';
import DebateTest from './pages/DebateTest';
import IdolPositionTest from './pages/IdolPositionTest';
import ResilienceTest from './pages/ResilienceTest';
import MandalartPlanner from './pages/MandalartPlanner';
import LifeExpectancy from './pages/LifeExpectancy';
import LottoSimulator from './pages/LottoSimulator';
import InitialSoundQuiz from './pages/InitialSoundQuiz';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router basename="/">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/length" element={<LengthConverter />} />
              <Route path="/weight" element={<WeightConverter />} />
              <Route path="/loan" element={<LoanCalculator />} />
              <Route path="/date" element={<DateCalculator />} />
              <Route path="/date-calc" element={<DateCalculator />} />
              <Route path="/dday-calc" element={<DateCalculator />} />
              <Route path="/word-count" element={<WordCounter />} />
              <Route path="/word-counter" element={<WordCounter />} />
              <Route path="/currency" element={<CurrencyConverter />} />
              <Route path="/unicode" element={<UnicodeConverter />} />
              <Route path="/lotto" element={<LottoGenerator />} />
              <Route path="/special-char" element={<SpecialCharacters />} />
              <Route path="/ascii-table" element={<AsciiTable />} />
              <Route path="/color-picker" element={<ColorPicker />} />
              <Route path="/ip-address" element={<IpAddress />} />
              <Route path="/flashlight" element={<Flashlight />} />
              <Route path="/qr-gen" element={<QrGenerator />} />
              <Route path="/qr-generator" element={<QrGenerator />} />
              <Route path="/barcode-gen" element={<BarcodeGenerator />} />
              <Route path="/string-converter" element={<StringConverter />} />
              <Route path="/case-converter" element={<StringConverter />} />
              <Route path="/string-utils" element={<StringConverter />} />
              <Route path="/html-view" element={<HtmlFormatter />} />
              <Route path="/html-formatter" element={<HtmlFormatter />} />
              <Route path="/diff" element={<CodeDiff />} />
              <Route path="/code-diff" element={<CodeDiff />} />
              <Route path="/code-compare" element={<CodeDiff />} />
              <Route path="/compare" element={<CodeDiff />} />
              <Route path="/checklist" element={<Checklist />} />
              <Route path="/web-editor" element={<WebEditor />} />
              <Route path="/image-base64" element={<ImageToBase64 />} />
              <Route path="/ascii-art" element={<AsciiArt />} />
              <Route path="/base64" element={<Base64Tool />} />
              <Route path="/password-gen" element={<PasswordGenerator />} />
              <Route path="/blood-type" element={<BloodType />} />
              <Route path="/json-formatter" element={<JsonFormatter />} />
              <Route path="/work-hours" element={<WorkHoursCalculator />} />
              <Route path="/salary-calc" element={<SalaryCalculator />} />
              <Route path="/hash-gen" element={<HashGenerator />} />
              <Route path="/uuid-gen" element={<UuidGenerator />} />
              <Route path="/age-calc" element={<AgeCalculator />} />
              <Route path="/age" element={<AgeCalculator />} />
              <Route path="/age-calculator" element={<AgeCalculator />} />
              <Route path="/compound-interest" element={<CompoundInterestCalculator />} />
              <Route path="/html-encoder" element={<HtmlEncoder />} />
              <Route path="/timer" element={<TimerStopwatch />} />
              <Route path="/mbti" element={<MbtiTest />} />
              <Route path="/mbti-test" element={<MbtiTest />} />
              <Route path="/image-resize" element={<ImageResizer />} />
              <Route path="/base-converter" element={<BaseConverter />} />
              <Route path="/youtube-thumbnail" element={<YoutubeThumbnail />} />
              <Route path="/markdown-editor" element={<MarkdownEditor />} />
              <Route path="/saju" element={<Saju />} />
              <Route path="/compatibility" element={<Saju />} />
              <Route path="/gunghap" element={<Saju />} />
              <Route path="/zodiac-fortune" element={<ZodiacFortune />} />
              <Route path="/horoscope" element={<Horoscope />} />
              <Route path="/dream-interpretation" element={<DreamInterpretation />} />
              <Route path="/name-analysis" element={<NameAnalysis />} />
              <Route path="/biorhythm" element={<Biorhythm />} />
              <Route path="/birth-gen" element={<BirthGen />} />
              <Route path="/bmi" element={<BMI />} />
              <Route path="/bmr" element={<BMR />} />
              <Route path="/reaction-test" element={<ReactionTest />} />
              <Route path="/typing-test" element={<TypingTest />} />

              <Route path="/tarot" element={<TarotCard />} />
              <Route path="/temperature-converter" element={<TemperatureConverter />} />
              <Route path="/temperature" element={<TemperatureConverter />} />
              <Route path="/temp-conv" element={<TemperatureConverter />} />
              <Route path="/url-encoder" element={<UrlEncoderDecoder />} />
              <Route path="/jwt-decoder" element={<JwtDecoder />} />
              <Route path="/regex-tester" element={<RegexTester />} />
              <Route path="/pomodoro-timer" element={<PomodoroTimer />} />
              <Route path="/pomodoro" element={<PomodoroTimer />} />
              <Route path="/1to50" element={<OneToFifty />} />
              <Route path="/one-to-fifty" element={<OneToFifty />} />
              <Route path="/cps-test" element={<CpsTest />} />
              <Route path="/aim-trainer" element={<AimTrainer />} />
              <Route path="/number-memory" element={<NumberMemory />} />
              <Route path="/number-baseball" element={<NumberBaseball />} />
              <Route path="/minesweeper" element={<Minesweeper />} />
              <Route path="/roulette" element={<Roulette />} />
              <Route path="/ladder-game" element={<LadderGame />} />
              <Route path="/suika-game" element={<SuikaGame />} />
              <Route path="/2048" element={<Game2048 />} />
              <Route path="/tanghulu-maker" element={<TanghuluGame />} />
              <Route path="/flappy-bird" element={<FlappyBird />} />
              <Route path="/missile-dodge" element={<MissileDodge />} />
              <Route path="/snake-game" element={<SnakeGame />} />
              <Route path="/sudoku" element={<Sudoku />} />
              <Route path="/sudoku-game" element={<Sudoku />} />
              <Route path="/tower-stacker" element={<TowerStacker />} />
              <Route path="/tower-blocks" element={<TowerStacker />} />
              <Route path="/cron-generator" element={<CronGenerator />} />
              <Route path="/csv-json" element={<CsvJsonConverter />} />
              <Route path="/discount-calculator" element={<DiscountCalculator />} />
              <Route path="/color-extractor" element={<ColorExtractor />} />
              <Route path="/area-converter" element={<AreaConverter />} />
              <Route path="/volume-converter" element={<VolumeConverter />} />
              <Route path="/speed-converter" element={<SpeedConverter />} />
              <Route path="/world-clock" element={<WorldClock />} />
              <Route path="/percent-calculator" element={<PercentCalculator />} />
              <Route path="/fraction-calculator" element={<FractionCalculator />} />
              <Route path="/encryption-tool" element={<EncryptionTool />} />
              <Route path="/dice-roller" element={<DiceRoller />} />
              <Route path="/lunch" element={<LunchRecommender />} />
              <Route path="/lunch-recommender" element={<LunchRecommender />} />
              <Route path="/severance-calc" element={<SeveranceCalculator />} />
              <Route path="/minimum-wage" element={<MinimumWageCalculator />} />
              <Route path="/min-wage-calc" element={<MinimumWageCalculator />} />
              <Route path="/personal-color" element={<PersonalColor />} />
              <Route path="/color-test" element={<PersonalColor />} />
              <Route path="/past-life" element={<PastLife />} />
              <Route path="/name-past-life" element={<PastLife />} />
              <Route path="/pet-mbti" element={<PetMbti />} />
              <Route path="/dog-cat-mbti" element={<PetMbti />} />
              <Route path="/mental-age" element={<MentalAge />} />
              <Route path="/mind-age" element={<MentalAge />} />
              <Route path="/brain-structure" element={<BrainStructure />} />
              <Route path="/my-brain" element={<BrainStructure />} />
              <Route path="/joseon-job" element={<JoseonJob />} />
              <Route path="/past-job" element={<JoseonJob />} />
              <Route path="/if-i-am-god" element={<IfIAmGod />} />
              <Route path="/god-test" element={<IfIAmGod />} />
              <Route path="/first-impression-color" element={<FirstImpressionColor />} />
              <Route path="/my-color" element={<FirstImpressionColor />} />
              <Route path="/animal-face" element={<AnimalFace />} />
              <Route path="/personal-scent" element={<PersonalScent />} />
              <Route path="/ideal-type" element={<IdealType />} />
              <Route path="/couple-compatibility" element={<CoupleCompatibility />} />
              <Route path="/hidden-talent" element={<HiddenTalent />} />
              <Route path="/balance-game" element={<BalanceGame />} />
              <Route path="/fortune-cookie" element={<FortuneCookie />} />
              <Route path="/color-sensitivity" element={<ColorTest />} />
              <Route path="/speed-math" element={<SpeedMath />} />
              <Route path="/bubble-wrap" element={<BubbleWrap />} />
              <Route path="/hearing-test" element={<HearingTest />} />
              <Route path="/spelling-quiz" element={<SpellingQuiz />} />
              <Route path="/time-sense" element={<TimeSense />} />
              <Route path="/pitch-test" element={<PitchTest />} />
              <Route path="/capital-quiz" element={<CapitalQuiz />} />
              <Route path="/typing-defense" element={<TypingDefense />} />
              <Route path="/vocabulary-test" element={<VocabularyTest />} />
              <Route path="/dynamic-acuity" element={<DynamicAcuity />} />
              <Route path="/hangman" element={<Hangman />} />
              <Route path="/morse-code" element={<MorseCode />} />
              <Route path="/smile-dating-test" element={<SmileDatingTest />} />
              <Route path="/dating-test" element={<DatingTest />} />
              <Route path="/stress-test" element={<StressTest />} />
              <Route path="/brain-type" element={<BrainType />} />
              <Route path="/eq-test" element={<EqTest />} />
              <Route path="/smartphone-addiction" element={<SmartphoneAddiction />} />
              <Route path="/kkondae-test" element={<KkondaeTest />} />
              <Route path="/hogu-test" element={<HoguTest />} />
              <Route path="/debate-test" element={<DebateTest />} />
              <Route path="/idol-test" element={<IdolPositionTest />} />
              <Route path="/resilience-test" element={<ResilienceTest />} />
              <Route path="/mandalart" element={<MandalartPlanner />} />
              <Route path="/life-expectancy" element={<LifeExpectancy />} />
              <Route path="/lotto-sim" element={<LottoSimulator />} />
              <Route path="/initial-sound-quiz" element={<InitialSoundQuiz />} />
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                  <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">페이지를 찾을 수 없습니다.</p>
                  <a href="/" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    홈으로 돌아가기
                  </a>
                </div>
              } />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
