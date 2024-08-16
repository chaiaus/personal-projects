import pygame
import sys
from pygame.locals import *
import random as rd

# UI Design
white = (255,255,255)
onyx = (61,61,61)
davys_gray = (82, 82, 82)
gray = (125,125,125)
timberwolf = (205,203,196)
battleship_gray = (146,144,139)
black = (0,0,0)
peach = (255,202,166)
cyclamen = (248,101,148)
green_yellow = (157,248,59)
fern_green = (83,108,57)
green = (0,255,0)
red = (255,0,0)
blue = (0,0,255)

xpos = 55
ypos = 90
width = 50
height = 65

val = ''
guess = ['','','']
run = True

def generateRound():
    numberList = ['0','1','2','3','4','5','6','7','8','9']

    # Generates PIN for the round - gets 3 digits from numberList then remove them after
    pin=[]
    while len(pin) < 3:
        randomDigit = rd.choice(numberList)
        numberList.remove(randomDigit)
        pin.append(randomDigit)
    pinCopy = pin[:]
    #print(f"1. Pin: {pin}, Pin Copy: {pinCopy} \nNumber List: {numberList}")

    # Clue No. 2 - gets 3 digits from the remaining choices in numberList then remove them after
    clue2 = []
    for x in range(3):
        xdigit = rd.choice(numberList)
        clue2.append(xdigit)
        numberList.remove(xdigit)
    clue2Copy = clue2[:]
    #print(f"2. Pin Copy: {pinCopy} \nClue No.2: {clue2}, Clue2 Copy: {clue2Copy} \nNumber List: {numberList}")

    # Clue No. 4 - gets 1 digit from the pin, 1 digit from clue 2, 1 digit from the numberList
    pinNum1 = rd.choice(pin) 
    pinCopy.remove(pinNum1)
    xdigit2 = rd.choice(clue2Copy)
    clue2Copy.remove(xdigit2)
    xdigit3 = rd.choice(numberList)
    numberList.remove(xdigit3)
    clue4 = [pinNum1, xdigit2, xdigit3]
    while clue4.index(pinNum1) != pin.index(pinNum1) or clue4.index(xdigit2) == clue2.index(xdigit2):
        rd.shuffle(clue4)
    #print(f"3. Pin Copy: {pinCopy} \nClue No.2: {clue2}, Clue2 Copy: {clue2Copy} \nClue No.4: {clue4} \nNumber List: {numberList}")

    # Clue No. 3 - gets the 2 digits from the pin that is not in Clue No. 4, and a random digit from the numberList
    pinNum2 = pinCopy[0]
    pinNum3 = pinCopy[1]
    xdigit4 = rd.choice(numberList)
    numberList.remove(xdigit4)
    clue3 = [pinNum2, pinNum3, xdigit4]
    while clue3.index(pinNum2) == pin.index(pinNum2) or clue3.index(pinNum3) == pin.index(pinNum3):
        rd.shuffle(clue3)
    #print(f"2. Pin Copy: {pinCopy} \nClue No.3: {clue3} \nNumber List: {numberList}")

    # Clue No. 1 - gets 1 digit from the pin, 2 random digits from the numberList
    xdigit5 = rd.choice(numberList)
    numberList.remove(xdigit5)
    xdigit6 = rd.choice(numberList)
    #rdmPin = rd.choice(pinCopy)
    clue1 = [pinNum2, xdigit5, xdigit6]
    while clue1.index(pinNum2) == pin.index(pinNum2) or clue1.index(pinNum2) == clue3.index(pinNum2):
        rd.shuffle(clue1)
    #print(f"2. Pin Copy: {pinCopy} \nNumber List: {numberList} \nClue No.2: {clue2}, Clue2 Copy: {clue2Copy}")

    # Clue No. 5 - gets 1 digit from the pin same with Clue No.3 and 2 random digits from the numberList
    xdigit7 = rd.choice(numberList)
    xdigit8 = rd.choice(clue2Copy)
    clue5 = [pinNum3, xdigit7, xdigit8]
    while clue5.index(pinNum3) == pin.index(pinNum3) or clue5.index(pinNum3) == clue3.index(pinNum3):
        rd.shuffle(clue5)
    
    
    clues = [clue1,clue2,clue3,clue4,clue5]
    code = ''.join(str(n) for n in pin)

    #print(*clues, sep="\n")
    return clues, code

def validateAnswer():
    answer = ''.join(str(n) for n in guess)
    if answer == code:
        return f"You're right! The code is {code}.", green
    else:
        return f"Wrong. The correct code is {code}.", red

round = generateRound()
clues = round[0]
code = round[1]
flag = 0
textclues = ['One number is correct but is wrongly placed',
            'Nothing is correct',
            'Two numbers are correct but are wrongly placed',
            'One number is correct and is well placed',
            'One number is correct but is wrongly placed']

class Pane(object):
    def __init__(self):
        pygame.init()
        self.font = pygame.font.SysFont('Rockwell', 26)
        self.cluefont = pygame.font.SysFont('Rockwell', 22)
        self.pinfont = pygame.font.SysFont('digital7rg1ml', 50)
        pygame.display.set_caption('Crack the Code in Python')
        self.screen = pygame.display.set_mode((800,650), 0, 32)
        self.screen.fill((onyx))
        pygame.display.update()

    def addClueRect(self, row, index, box, yspc):
        digit = clues[row][index]
        self.rect = pygame.draw.rect(self.screen, battleship_gray, (xpos*box, (self.screen.get_height()/16)+yspc, width,height), width=3, border_radius=7)
        self.screen.blit(self.pinfont.render(digit, True, white), ((self.rect.x+(width/4)), self.rect.y+5))

        rectpos = ((self.screen.get_height()/16)+yspc)+(height/3)
        return rectpos

    def pinRect(self):
        self.screen.blit(self.font.render("Enter the Code:", True, white), (self.screen.get_width()/2.715, (self.screen.get_height()/1.4)))
        pin1 = pygame.draw.rect(self.screen, timberwolf, ((self.screen.get_width()/2.7), (self.screen.get_height()/1.3), width+10,height), border_radius=12)
        pin2 = pygame.draw.rect(self.screen, timberwolf, ((self.screen.get_width()/2.2), (self.screen.get_height()/1.3), width+10,height), border_radius=12)
        pin3 = pygame.draw.rect(self.screen, timberwolf, ((self.screen.get_width()/1.86), (self.screen.get_height()/1.3), width+10,height), border_radius=12)

        return pin1, pin2, pin3
    
    def typeDigit(self, val, digitpos):
        self.screen.blit(self.pinfont.render(val, True, black), (digitpos+20, (self.screen.get_height()/1.28)))
    
    def showMessage(self, msg):
        self.screen.blit(self.cluefont.render(msg[0], True, msg[1]), (self.screen.get_width()/3.3, (self.screen.get_height()/1.1)))
    
    def focusRect(self, digitpos):
        pygame.draw.rect(self.screen, white, (digitpos, (self.screen.get_height()/1.307), width+12,height+6), width=3, border_radius=12)
        pygame.display.update()

if __name__ == '__main__':

    Pan3 = Pane()

    for row in range(5):
        for box in range(3):
            index = box
            box+=1
            yspc = 80 * row
            cluerectheight = Pan3.addClueRect(row, index, box, yspc)

        Pan3.screen.blit(Pan3.cluefont.render(textclues[row], True, black), (Pan3.screen.get_width()/3.5, cluerectheight))
        
    pin_rect = Pan3.pinRect()
    pygame.display.update()
    digitpos = 0
    while run:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit(); sys.exit();
            
            if event.type == pygame.MOUSEBUTTONDOWN:

                if pin_rect[0].collidepoint(event.pos):
                    digitpos = (Pan3.screen.get_width()/2.71)
                    flag = 1
                    index = 0
                if pin_rect[1].collidepoint(event.pos):
                    digitpos = (Pan3.screen.get_width()/2.205)
                    flag = 1
                    index = 1
                if pin_rect[2].collidepoint(event.pos):
                    digitpos = (Pan3.screen.get_width()/1.862)
                    flag = 1
                    index = 2
                        
            if event.type == pygame.KEYDOWN:
                match event.key:
                    case pygame.K_0: val = '0'
                    case pygame.K_1: val = '1'
                    case pygame.K_2: val = '2'
                    case pygame.K_3: val = '3'
                    case pygame.K_4: val = '4'
                    case pygame.K_5: val = '5'
                    case pygame.K_6: val = '6'
                    case pygame.K_7: val = '7'
                    case pygame.K_8: val = '8'
                    case pygame.K_9: val = '9'

                if event.key == pygame.K_RETURN and guess != []: 
                    msg = validateAnswer()
                    Pan3.showMessage(msg)
                    pygame.display.update()
                
                if event.key != pygame.K_RETURN and event.key != pygame.K_RIGHT:
                    if guess[index] == '':
                        guess[index] = val
                        Pan3.typeDigit(guess[index], digitpos)
                        pygame.display.update()
                    
        if flag == 1:
            Pan3.focusRect(digitpos)