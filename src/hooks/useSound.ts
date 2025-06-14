import { useRef, useEffect } from 'react';

// Import sound files
import moveSound from '../assets/audio/move.mp3';
import matchSound from '../assets/audio/match.mp3';
import scoreSound from '../assets/audio/score.mp3';
import gameOverSound from '../assets/audio/gameover.mp3';

type SoundType = 'move' | 'match' | 'score' | 'gameOver';

export const useSound = () => {
    const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({
        move: null,
        match: null,
        score: null,
        gameOver: null
    });

    useEffect(() => {
        // Create audio elements
        audioRefs.current = {
            move: new Audio(moveSound),
            match: new Audio(matchSound),
            score: new Audio(scoreSound),
            gameOver: new Audio(gameOverSound)
        };

        // Set volume for all sounds
        Object.values(audioRefs.current).forEach(audio => {
            if (audio) {
                audio.volume = 0.5;
            }
        });

        // Cleanup function
        return () => {
            Object.values(audioRefs.current).forEach(audio => {
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            });
        };
    }, []);

    const playSound = (type: SoundType) => {
        const audio = audioRefs.current[type];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(error => {
                console.error(`Error playing ${type} sound:`, error);
            });
        }
    };

    return { playSound };
};

export default useSound;
