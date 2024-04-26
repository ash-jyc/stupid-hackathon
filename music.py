import librosa
import numpy as np
import matplotlib.pyplot as plt
from random import randint
BASE_DIR_TRAIN = '/Users/ashle/Documents/Machine Learning/2024spcs-360-machine-learning-final-competition/test_mp3s/'


# load audio file --- y, sr = librosa.load(filename)

class Music:
    def __init__(self):
        self.song = self.choose_song()
        
    def choose_song(self):
        num = randint(0, 2446)
        print(BASE_DIR_TRAIN + str(num) + '.mp3')
        y, sr = librosa.load(BASE_DIR_TRAIN + str(num) + '.mp3', sr=25)

        print(type(y))
        return y
        # print(y)

        # plt.figure(figsize=(15, 5))
        # plt.plot(np.arange(len(y))/sr, y)
        # plt.xlabel('Time (s)')
        # plt.ylabel('Amplitude')
        # plt.show()

choose_song()