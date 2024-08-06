import React, {useState} from "react";
import ContentContainer from "../components/ContentContainer";
import styled from "styled-components";
import Button from "../components/Button.tsx";
import { Howl } from 'howler';
import ButtonContainer from "../components/ButtonContainer.tsx";
import ButtonWrapper from "../components/ButtonWrapper.tsx";
import OptionsWrapper from "../components/OptionsWrapper.tsx";
import EmptyButton from "../components/EmptyButton.tsx";
import Option from "../components/Option.tsx";

const HomeTitle = styled.h3`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  text-align: center;
`;

type Ison = {
  byzNote: Note,
  westernNote: Note,
  howler: Howl,
  order: number,
  pitch: number
}

enum NotationType {
  BYZANTINE = "Byzantine",
  WESTERN = "Western"
}

enum Note {
  Di = "Dhi",
  DiDown = "Dhi ↓",
  Ga = "Gha",
  Ke = "Ke",
  KeDown = "Ke ↓",
  Ni = "Ni",
  NiUp = "Ni ↑",
  Pa= "Pa",
  Vu = "Vou",
  Zo = "Zo",
  ZoDown = "Zo ↓",
  ZoIFES = "Zo (ifes)",
  ZoIFESDown = "Zo (ifes) ↓",
  GaDown = "Gha ↓",

  A = "A",
  ADown = "A ↓",
  ASharp = "A#",
  B = "B",
  BDown = "B ↓",
  BFlat = "B♭",
  BFlatDown = "B♭ ↓",
  C = "C",
  CUp = "C ↑",
  CSharp = "C#",
  D = "D",
  DSharp = "D#",
  E = "E",
  F = "F",
  FDown = "F ↓",
  FSharp = "F#",
  G = "G",
  GDown = "G ↓",
  GSharp = "G#",

  Unknown = "??"
}

enum ToneType {
  VOICE = "Voice",
  TAMBURA = "Tambura"
}

enum ScaleType {
  BYZANTINE = "Byzantine",
  CHROMATIC = "Chromatic"
}

const DiHowl = new Howl({src: ["/ison/vocals/DI.wav"], loop: true, volume: 0});
const DiDownHowl = new Howl({src: ["/ison/vocals/DI_Down.wav"], loop: true, volume: 0});
const GaHowl = new Howl({src: ["/ison/vocals/GA.wav"], loop: true, volume: 0});
const KeHowl = new Howl({src: ["/ison/vocals/KE.wav"], loop: true, volume: 0});
const KeDownHowl = new Howl({src: ["/ison/vocals/KE_Down.wav"], loop: true, volume: 0});
const NiHowl = new Howl({src: ["/ison/vocals/NI.wav"], loop: true, volume: 0});
const NiUpHowl = new Howl({src: ["/ison/vocals/NI_Up.wav"], loop: true, volume: 0});
const PaHowl = new Howl({src: ["/ison/vocals/PA.wav"], loop: true, volume: 0});
const VuHowl = new Howl({src: ["/ison/vocals/VU.wav"], loop: true, volume: 0});
const ZoHowl = new Howl({src: ["/ison/vocals/ZO.wav"], loop: true, volume: 0});
const ZoDownHowl = new Howl({src: ["/ison/vocals/ZO_Down.wav"], loop: true, volume: 0});
const ZoIFESHowl = new Howl({src: ["/ison/vocals/ZO_IFES.wav"], loop: true, volume: 0});
const ZoIFESDownHowl = new Howl({src: ["/ison/vocals/ZO_IFES_Down.wav"], loop: true, volume: 0});

const TONES: Array<Ison> = [
  {byzNote: Note.Di, westernNote: Note.G, howler: DiHowl, order: 1, pitch: 1},
  {byzNote: Note.DiDown, westernNote: Note.GDown, howler: DiDownHowl, order: 9, pitch: 1},
  {byzNote: Note.Ga, westernNote: Note.F, howler: GaHowl, order: 8, pitch: 1},
  {byzNote: Note.Ke, westernNote: Note.A, howler: KeHowl, order: 2, pitch: 1},
  {byzNote: Note.KeDown, westernNote: Note.ADown, howler: KeDownHowl, order: 10, pitch: 1},
  {byzNote: Note.Ni, westernNote: Note.C, howler: NiHowl, order: 5, pitch: 1},
  {byzNote: Note.NiUp, westernNote: Note.CUp, howler: NiUpHowl, order: 0, pitch: 1},
  {byzNote: Note.Pa, westernNote: Note.D, howler: PaHowl, order: 6, pitch: 1},
  {byzNote: Note.Vu, westernNote: Note.E, howler: VuHowl, order: 7, pitch: 1.05},
  {byzNote: Note.Zo, westernNote: Note.B, howler: ZoHowl, order: 4, pitch: 1.03},
  {byzNote: Note.ZoDown, westernNote: Note.BDown, howler: ZoDownHowl, order: 12, pitch: 1.03},
  {byzNote: Note.ZoIFES, westernNote: Note.BFlat, howler: ZoIFESHowl, order: 3, pitch: 1},
  {byzNote: Note.ZoIFESDown, westernNote: Note.BFlatDown, howler: ZoIFESDownHowl, order: 11, pitch: 1},
  {byzNote: Note.GaDown, westernNote: Note.FDown, howler: ZoIFESDownHowl, order: 13, pitch: 0.75}
];

const AHowl = new Howl({src: ["/ison/vocals/tambura/A_drone_(Ni).m4a"], loop: true, volume: 0});
const ASharpHowl = new Howl({src: ["/ison/vocals/tambura/ASharp_drone.m4a"], loop: true, volume: 0});
const BHowl = new Howl({src: ["/ison/vocals/tambura/B_drone_(Pa).m4a"], loop: true, volume: 0});
const CHowl = new Howl({src: ["/ison/vocals/tambura/C_drone.m4a"], loop: true, volume: 0});
const CSharpHowl = new Howl({src: ["/ison/vocals/tambura/CSharp_drone_(Vou).m4a"], loop: true, volume: 0});
const DHowl = new Howl({src: ["/ison/vocals/tambura/D_drone_(Ga).m4a"], loop: true, volume: 0});
const DSharpHowl = new Howl({src: ["/ison/vocals/tambura/DSharp_drone.m4a"], loop: true, volume: 0});
const EHowl = new Howl({src: ["/ison/vocals/tambura/E_drone_(Di).m4a"], loop: true, volume: 0});
const FHowl = new Howl({src: ["/ison/vocals/tambura/F_drone.m4a"], loop: true, volume: 0});
const FSharpHowl = new Howl({src: ["/ison/vocals/tambura/FSharp_drone_(Ke).m4a"], loop: true, volume: 0});
const GHowl = new Howl({src: ["/ison/vocals/tambura/G_drone_(Zo_b).m4a"], loop: true, volume: 0});
const GSharpHowl = new Howl({src: ["/ison/vocals/tambura/GSharp_drone_(Zo).m4a"], loop: true, volume: 0});

const TAMBURA_CHROMATIC: Array<Ison> = [
  {byzNote: Note.ZoDown, westernNote: Note.G, howler: GHowl, order: 8, pitch: 1},
  {byzNote: Note.Zo, westernNote: Note.GSharp, howler: GSharpHowl, order: 9, pitch: 1},
  {byzNote: Note.Ni, westernNote: Note.A, howler: AHowl, order: 10, pitch: 1},
  {byzNote: Note.Ni, westernNote: Note.ASharp, howler: ASharpHowl, order: 11, pitch: 1},
  {byzNote: Note.Pa, westernNote: Note.B, howler: BHowl, order: 4, pitch: 1},
  {byzNote: Note.Ni, westernNote: Note.C, howler: CHowl, order: 5, pitch: 1},
  {byzNote: Note.Vu, westernNote: Note.CSharp, howler: CSharpHowl, order: 6, pitch: 1},
  {byzNote: Note.Ga, westernNote: Note.D, howler: DHowl, order: 7, pitch: 1},
  {byzNote: Note.Ni, westernNote: Note.DSharp, howler: DSharpHowl, order: 0, pitch: 1},
  {byzNote: Note.Di, westernNote: Note.E, howler: EHowl, order: 1, pitch: 1},
  {byzNote: Note.Ni, westernNote: Note.F, howler: FHowl, order: 2, pitch: 1},
  {byzNote: Note.Ke, westernNote: Note.FSharp, howler: FSharpHowl, order: 3, pitch: 1},
]

const TAMBURA_BYZANTINE: Array<Ison> = [
  {byzNote: Note.NiUp, westernNote: Note.C, howler: CHowl, order: 0, pitch: 2.0},
  {byzNote: Note.Di, westernNote: Note.G, howler: GHowl, order: 1, pitch: 2.0},
  {byzNote: Note.Ke, westernNote: Note.A, howler: AHowl, order: 2, pitch: 2.0},
  {byzNote: Note.ZoIFES, westernNote: Note.BFlat, howler: ASharpHowl, order: 3, pitch: 2.0},
  {byzNote: Note.Zo, westernNote: Note.B, howler: BHowl, order: 4, pitch: 2.0},
  {byzNote: Note.Ni, westernNote: Note.C, howler: CHowl, order: 5, pitch: 1},
  {byzNote: Note.Pa, westernNote: Note.D, howler: DHowl, order: 6, pitch: 1},
  {byzNote: Note.Vu, westernNote: Note.E, howler: EHowl, order: 7, pitch: 1},
  {byzNote: Note.Ga, westernNote: Note.F, howler: FHowl, order: 8, pitch: 1},
  {byzNote: Note.DiDown, westernNote: Note.GDown, howler: GHowl, order: 9, pitch: 1},
  {byzNote: Note.KeDown, westernNote: Note.ADown, howler: AHowl, order: 10, pitch: 1},
  {byzNote: Note.ZoIFESDown, westernNote: Note.BFlatDown, howler: ASharpHowl, order: 11, pitch: 1},
  {byzNote: Note.ZoDown, westernNote: Note.BDown, howler: BHowl, order: 12, pitch: 1},
  {byzNote: Note.GaDown, westernNote: Note.FDown, howler: FHowl, order: 13, pitch: .5},
]

const OrderSort = (a: Ison, b: Ison) => {
  return a.order - b.order;
}

const Home: React.FC = () => {
  const [currentNote, setCurrentNote] = useState<Note | undefined>();
  const [tones, setTones] = useState<Array<Ison>>(TONES.sort(OrderSort));
  const [currentPitch, setCurrentPitch] = useState<number>(1);
  const [currentGlobalPitch, setCurrentGlobalPitch] = useState<number>(1);
  const [notationType, setNotationType] = useState<NotationType>(NotationType.BYZANTINE);
  const [toneType, setToneType] = useState<ToneType>(ToneType.VOICE);
  const [scaleType, setScaleType] = useState<ScaleType>(ScaleType.BYZANTINE);
  const [canClick, setCanClick] = useState<boolean>(true);

  const fadeAll = () => {
    tones.forEach((tone) => {
      if (tone.howler.volume() === 1) {
        tone.howler.fade(1, 0, 500);
        setTimeout(() => {
          tone.howler.stop();
        }, 500);
      }
    });
  }

  const playIson = (tone: Ison) => {
    if (!canClick) {
      return;
    }

    fadeAll();

    setCurrentPitch(tone.pitch + (currentGlobalPitch - 1));

    if (!tone.howler.playing()) {
      tone.howler.play();
      tone.howler.rate(tone.pitch + (currentGlobalPitch - 1));
      tone.howler.fade(0, 1, 500);
    } else {
      tone.howler.fade(1, 0, 500);
      setTimeout(() => {
        tone.howler.stop();
      }, 500)
    }

    setCanClick(false);
    setTimeout(() => {
      setCanClick(true);
    }, 500);

    if (currentNote != getNote(tone)) {
      setCurrentNote(getNote(tone));
    } else {
      setCurrentNote(undefined);
    }
  }

  // const changePitch = (delta: number) => {
  //   if (currentNote) {
  //     const tone = tones.find((tone) => getNote(tone) == currentNote)!;
  //
  //     const rate = tone.pitch + delta + (currentGlobalPitch - 1);
  //     tone.howler.rate(rate);
  //
  //     const index = tones.map((tone) => getNote(tone)).indexOf(currentNote);
  //     const tonesCopy = tones;
  //
  //     tonesCopy[index] = {...tone, pitch: rate};
  //     setTones(tonesCopy);
  //     setCurrentPitch(rate);
  //   }
  // }

  const changeGlobalPitch = (pitch: number) => {
    setCurrentGlobalPitch(pitch);
    if (currentNote) {
      const tone = tones.find((tone) => getNote(tone) == currentNote)!;

      const rate = tone.pitch + (pitch - 1);
      console.log("RATE:: ", rate);
      tone.howler.rate(rate);
      setCurrentPitch(rate);
    }
  }

  const setPitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentNote) {
      const tone = tones.find((tone) => getNote(tone) == currentNote)!;

      const rate = event.target.valueAsNumber;
      tone.howler.rate(rate  + (currentGlobalPitch - 1));

      const index = tones.map((tone) => getNote(tone)).indexOf(currentNote);
      const tonesCopy = tones;

      tonesCopy[index] = {...tone, pitch: rate};
      setTones(tonesCopy);
      setCurrentPitch(rate);
    }
  }

  const changeNotationType = (type: NotationType) => {
    setNotationType(type);
  }

  const changeToneType = (type: ToneType) => {
    setToneType(type);
    fadeAll();
    setCurrentNote(undefined);
    if (type === ToneType.VOICE) {
      setTones(TONES.sort(OrderSort));
    } else {
      if (scaleType === ScaleType.BYZANTINE) {
        setTones(TAMBURA_BYZANTINE.sort(OrderSort));
      } else {
        setTones(TAMBURA_CHROMATIC.sort(OrderSort));
      }
    }
  }

  const changeScaleType = (type: ScaleType) => {
    setScaleType(type);
    fadeAll();
    setCurrentNote(undefined)
    if (type === ScaleType.BYZANTINE) {
      if (toneType === ToneType.VOICE) {
        setTones(TONES.sort(OrderSort));
      } else {
        setTones(TAMBURA_BYZANTINE.sort(OrderSort));
      }
      setNotationType(NotationType.BYZANTINE);
    } else {
      setTones(TAMBURA_CHROMATIC.sort(OrderSort));
      setNotationType(NotationType.WESTERN);
    }
  }

  const getNote = (ison: Ison) => {
    return notationType === NotationType.BYZANTINE ? ison.byzNote : ison.westernNote;
  }

  const getSliceIndex = (index: number): number => {
    if (scaleType === ScaleType.BYZANTINE) {
      return index
    }
    return index - 1;
  }

  return (
    <ContentContainer>
      <HomeTitle>Chip's Ison App</HomeTitle>
      <OptionsWrapper>
        <Option>
          <p>Current Scale: {scaleType.toString()}</p>
          <input type="button" onClick={() => changeScaleType(ScaleType.BYZANTINE)} value="Use Byzantine Scale" />
          <input type="button" onClick={() => changeScaleType(ScaleType.CHROMATIC)} value="Use Chromatic Scale" />
        </Option>
        <Option>
          <p>Current Notation: {notationType.toString()}</p>
          <input type="button" onClick={() => changeNotationType(NotationType.BYZANTINE)} value="Use Byzantine Notation" />
          <input type="button" onClick={() => changeNotationType(NotationType.WESTERN)} value="Use Western Notation" />
        </Option>
        <Option>
          <p>Current Tone: {toneType.toString()}</p>
          <input type="button" disabled={scaleType === ScaleType.CHROMATIC} onClick={() => changeToneType(ToneType.VOICE)} value="Use Voice" />
          <input type="button" onClick={() => changeToneType(ToneType.TAMBURA)} value="Use Tambura" />
        </Option>
      </OptionsWrapper>
      <OptionsWrapper>
        <Option>
          <div style={{display: "flex", alignSelf: "center"}}>
            {/*<input type="button" onClick={() => changePitch(.01)} value="+" />*/}
            <p style={{margin: "0 24px"}}>Active Track Pitch: {currentPitch}</p>
            {/*<input type="button" onClick={() => changePitch(-.01)} value="-" />*/}
          </div>
          <input type="range" max={2} min={0} step={.01} value={currentPitch} onChange={(event) => setPitch(event)} />
        </Option>

        <Option>
          <div style={{display: "flex", alignSelf: "center"}}>
            <p style={{margin: "0 24px"}}>Global Pitch: {currentGlobalPitch}</p>
          </div>
          <input type="range" max={2} min={0} step={.01} value={currentGlobalPitch} onChange={(event) => changeGlobalPitch(event.target.valueAsNumber)} />
        </Option>
      </OptionsWrapper>
      <ButtonContainer>
        {scaleType === ScaleType.BYZANTINE &&
          <ButtonWrapper>
            <Button selected={currentNote == getNote(tones[0])} onClick={() => playIson(tones[0])}>{getNote(tones[0]).toString()}</Button>
            <EmptyButton></EmptyButton>
            <EmptyButton></EmptyButton>
            <EmptyButton></EmptyButton>
          </ButtonWrapper>
        }
        <ButtonWrapper>
          {
            tones.slice(getSliceIndex(1), getSliceIndex(5)).map((tone) => {
              return <Button selected={currentNote == getNote(tone)} key={tone.order} onClick={() => playIson(tone)}>{getNote(tone).toString()}</Button>
            })
          }
        </ButtonWrapper>
        <ButtonWrapper>
          {
            tones.slice(getSliceIndex(5), getSliceIndex(9)).map((tone) => {
              return <Button selected={currentNote == getNote(tone)} key={tone.order} onClick={() => playIson(tone)}>{getNote(tone).toString()}</Button>
            })
          }
        </ButtonWrapper>
        <ButtonWrapper>
          {
            tones.slice(getSliceIndex(9), getSliceIndex(13)).map((tone) => {
              return <Button selected={currentNote == getNote(tone)} key={tone.order} onClick={() => playIson(tone)}>{getNote(tone).toString()}</Button>
            })
          }
        </ButtonWrapper>
        {scaleType === ScaleType.BYZANTINE &&
          <ButtonWrapper>
            <EmptyButton></EmptyButton>
            <EmptyButton></EmptyButton>
            <EmptyButton></EmptyButton>
            <Button selected={currentNote == getNote(tones[13])} onClick={() => playIson(tones[13])}>{getNote(tones[13]).toString()}</Button>
          </ButtonWrapper>
        }
      </ButtonContainer>
    </ContentContainer>
  )
}

export default Home;
