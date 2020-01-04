#import chess


class GameState:
    def __init__(self, board, movement, parent):
        self.min = 99999
        self.max = -99999
        self.state = board
        self.children = []
        self.move = movement
        self.parent = parent

    def addChild(self, board, move):
        auxChild = GameState(board, move, self)
        self.children.append(auxChild)
        return auxChild

def boardEval(board):
    i = 0
    value = 0
    while i < 8*8:
        if board[i] == 'P':
            value += 10
        elif board[i] == 'N':
            value += 30
        elif board[i] == 'B':
            value += 30
        elif board[i] == 'R':
            value += 50
        elif board[i] == 'Q':
            value += 90
        elif board[i] == 'K':
            value += 900
        elif board[i] == 'p':
            value -= 10
        elif board[i] == 'n':
            value -= 30
        elif board[i] == 'b':
            value -= 30
        elif board[i] == 'r':
            value -= 50
        elif board[i] == 'q':
            value -= 90
        elif board[i] == 'k':
            value -= 900
        i+=1
    return value

def convertBoard(board):
    boardArray = board.split('|')
    newBoard = ''
    i = 0
    while i < len(boardArray):
        if boardArray[i] == 'pw':
            boardArray[i] = 'P'
        elif boardArray[i] == 'rw':
            boardArray[i] = 'R'
        elif boardArray[i] == 'kw':
            boardArray[i] = 'N'
        elif boardArray[i] == 'bw':
            boardArray[i] = 'B'
        elif boardArray[i] == 'qw':
            boardArray[i] = 'Q'
        elif boardArray[i] == 'Kw':
            boardArray[i] = 'K'
        elif boardArray[i] == 'pb':
            boardArray[i] = 'p'
        elif boardArray[i] == 'rb':
            boardArray[i] = 'r'
        elif boardArray[i] == 'kb':
            boardArray[i] = 'n'
        elif boardArray[i] == 'bb':
            boardArray[i] = 'b'
        elif boardArray[i] == 'qb':
            boardArray[i] = 'q'
        elif boardArray[i] == 'Kb':
            boardArray[i] = 'k'
        else:
            boardArray[i] = '.'
        if i < 8*8:
            newBoard += boardArray[i]
        i += 1
    return newBoard


def getPossibleMoves(board, player):
    moves = []
    i = 0
    while i < 8*8:
        x = i % 8
        y = int((i-(i % 8))/8)
        orig = chr(ord('a')+(7-x))+str(y+1).split('.')[0]
        #print(orig + " - " + board[i])
        # White Pieces
        # Pawn
        if player == 0:
            if board[i] == 'P':
                if y == 1:
                    if board[i + 16] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-x))+str(y+3).split('.')[0]))
                    '''if x > 0 and 'a' <= board[i+15] <= 'z':
                        moves.append(
                            orig + (chr(ord('a')+(7-(x-1)))+str(y+3).split('.')[0]))
                    if x < 7 and 'a' <= board[i+17] <= 'z':
                        moves.append(
                            orig + (chr(ord('a')+(7-(x+1)))+str(y+3).split('.')[0]))'''
                if y < 7:
                    if board[i + 8] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-x))+str(y+2).split('.')[0]))
                    if x > 0 and 'a' <= board[i+7] <= 'z':
                        moves.append(
                            orig + (chr(ord('a')+(7-(x-1)))+str(y+2).split('.')[0]))
                    if x < 7 and 'a' <= board[i+9] <= 'z':
                        moves.append(
                            orig + (chr(ord('a')+(7-(x+1)))+str(y+2).split('.')[0]))
            # Rook
            if board[i] == 'R':
                tempX = x
                tempY = int(y)
                while tempX > 0:
                    tempX -= 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'a' <= board[tempY * 8 + tempX] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                while tempX < 7:
                    tempX += 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'a' <= board[tempY * 8 + tempX] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                while tempY > 0:
                    tempY -= 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'a' <= board[tempY * 8 + tempX] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempY = int(y)
                while tempY < 7:
                    tempY += 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'a' <= board[tempY * 8 + tempX] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
            # Knight
            if board[i] == 'N':
                if x > 1:
                    if y > 0:
                        if board[(y-1) * 8 + (x-2)] == '.' or 'a' <= board[(y-1) * 8 + (x-2)] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(x-2)))+str(y).split('.')[0]))
                    if y < 7:
                        if board[(y+1) * 8 + (x-2)] == '.' or 'a' <= board[(y+1) * 8 + (x-2)] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(x-2)))+str(y+2).split('.')[0]))
                if x > 0:
                    if y > 1:
                        if board[(y-2) * 8 + (x-1)] == '.' or 'a' <= board[(y-2) * 8 + (x-1)] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(x-1)))+str(y-1).split('.')[0]))
                    if y < 6:
                        if board[(y+2) * 8 + (x-1)] == '.' or 'a' <= board[(y+2) * 8 + (x-1)] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(x-1)))+str(y+3).split('.')[0]))
                if x < 6:
                    if y > 0:
                        if board[(y-1) * 8 + (x+2)] == '.' or 'a' <= board[(y-1) * 8 + (x+2)] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(x+2)))+str(y).split('.')[0]))
                    if y < 7:
                        if board[(y+1) * 8 + (x+2)] == '.' or 'a' <= board[(y+1) * 8 + (x+2)] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(x+2)))+str(y+2).split('.')[0]))
                if x < 7:
                    if y > 1:
                        if board[(y-2) * 8 + (x+1)] == '.' or 'a' <= board[(y-2) * 8 + (x+1)] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(x+1)))+str(y-1).split('.')[0]))
                    if y < 6:
                        if board[(y+2) * 8 + (x+1)] == '.' or 'a' <= board[(y+2) * 8 + (x+1)] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(x+1)))+str(y+3).split('.')[0]))
            # Bishop
            if board[i] == 'B':
                tempX = x
                tempY = int(y)
                while tempX > 0 and tempY > 0:
                    tempX -= 1
                    tempY -= 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'a' <= board[tempY * 8 + tempX] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                tempY = int(y)
                while tempX > 0 and tempY < 7:
                    tempX -= 1
                    tempY += 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'a' <= board[tempY * 8 + tempX] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                tempY = int(y)
                while tempX < 7 and tempY > 0:
                    tempX += 1
                    tempY -= 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'a' <= board[tempY * 8 + tempX] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                tempY = int(y)
                while tempX < 7 and tempY < 7:
                    tempX += 1
                    tempY += 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'a' <= board[tempY * 8 + tempX] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
            # Queen
            if board[i] == 'Q':
                tempX = x
                tempY = int(y)
                while tempX > 0:
                    tempX -= 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'a' <= board[tempY * 8 + tempX] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                while tempX < 7:
                    tempX += 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'a' <= board[tempY * 8 + tempX] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                while tempY > 0:
                    tempY -= 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'a' <= board[tempY * 8 + tempX] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempY = int(y)
                while tempY < 7:
                    tempY += 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'a' <= board[tempY * 8 + tempX] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                tempY = int(y)
                while tempX > 0 and tempY > 0:
                    tempX -= 1
                    tempY -= 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'a' <= board[tempY * 8 + tempX] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                tempY = int(y)
                while tempX > 0 and tempY < 7:
                    tempX -= 1
                    tempY += 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'a' <= board[tempY * 8 + tempX] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                tempY = int(y)
                while tempX < 7 and tempY > 0:
                    tempX += 1
                    tempY -= 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'a' <= board[tempY * 8 + tempX] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                tempY = int(y)
                while tempX < 7 and tempY < 7:
                    tempX += 1
                    tempY += 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'a' <= board[tempY * 8 + tempX] <= 'z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
            # King
            if board[i] == 'K':
                if (board[(8*y)+x-1] == '.' or 'a' <= board[(8*y)+x-1] <= 'z') and x > 0:
                    moves.append(
                        orig + (chr(ord('a')+(7-(x-1)))+str(y+1).split('.')[0]))
                if (board[(8*y)+x+1] == '.' or 'a' <= board[(8*y)+x+1] <= 'z') and x < 7:
                    moves.append(
                        orig + (chr(ord('a')+(7-(x+1)))+str(y+1).split('.')[0]))
                if y > 0:
                    if (board[(8*(y-1))+x-1] == '.' or 'a' <= board[(8*(y-1))+x-1] <= 'z') and x > 0:
                        moves.append(
                            orig + (chr(ord('a')+(7-(x-1)))+str(y).split('.')[0]))
                    if board[(8*(y-1))+x] == '.' or 'a' <= board[(8*(y-1))+x] <= 'z':
                        moves.append(
                            orig + (chr(ord('a')+(7-(x)))+str(y).split('.')[0]))
                    if (board[(8*(y-1))+x+1] == '.' or 'a' <= board[(8*(y-1))+x+1] <= 'z') and x < 7:
                        moves.append(
                            orig + (chr(ord('a')+(7-(x+1)))+str(y).split('.')[0]))
                if y < 7:
                    if (board[(8*(y+1))+x-1] == '.' or 'a' <= board[(8*(y+1))+x-1] <= 'z') and x > 0:
                        moves.append(
                            orig + (chr(ord('a')+(7-(x-1)))+str(y+2).split('.')[0]))
                    if board[(8*(y+1))+x] == '.' or 'a' <= board[(8*(y+1))+x] <= 'z':
                        moves.append(
                            orig + (chr(ord('a')+(7-(x)))+str(y+2).split('.')[0]))
                    if (board[(8*(y+1))+x+1] == '.' or 'a' <= board[(8*(y+1))+x+1] <= 'z') and x < 7:
                        moves.append(
                            orig + (chr(ord('a')+(7-(x+1)))+str(y+2).split('.')[0]))
        elif player == 1:
            # Black Pieces
            # Pawn
            if board[i] == 'p':
                if y == 6:
                    if board[i - 16] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-x))+str(y-1).split('.')[0]))
                    '''if x > 0 and 'A' <= board[i-17] <= 'Z':
                        moves.append(
                            orig + (chr(ord('a')+(7-(x-1)))+str(y-1).split('.')[0]))
                    if x < 7 and 'A' <= board[i-15] <= 'Z':
                        moves.append(
                            orig + (chr(ord('a')+(7-(x+1)))+str(y-1).split('.')[0]))'''
                if y > 0:
                    if board[i - 8] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-x))+str(y).split('.')[0]))
                    if x > 0 and 'A' <= board[i-9] <= 'Z':
                        moves.append(
                            orig + (chr(ord('a')+(7-(x-1)))+str(y).split('.')[0]))
                    if x < 7 and 'A' <= board[i-7] <= 'Z':
                        moves.append(
                            orig + (chr(ord('a')+(7-(x+1)))+str(y).split('.')[0]))
            # Rook
            if board[i] == 'r':
                tempX = x
                tempY = int(y)
                while tempX > 0:
                    tempX -= 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'A' <= board[tempY * 8 + tempX] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                while tempX < 7:
                    tempX += 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'A' <= board[tempY * 8 + tempX] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                while tempY > 0:
                    tempY -= 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'A' <= board[tempY * 8 + tempX] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempY = int(y)
                while tempY < 7:
                    tempY += 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'A' <= board[tempY * 8 + tempX] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
            # Knight
            if board[i] == 'n':
                if x > 1:
                    if y > 0:
                        if board[(y-1) * 8 + (x-2)] == '.' or 'A' <= board[(y-1) * 8 + (x-2)] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(x-2)))+str(y).split('.')[0]))
                    if y < 7:
                        if board[(y+1) * 8 + (x-2)] == '.' or 'A' <= board[(y+1) * 8 + (x-2)] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(x-2)))+str(y+2).split('.')[0]))
                if x > 0:
                    if y > 1:
                        if board[(y-2) * 8 + (x-1)] == '.' or 'A' <= board[(y-2) * 8 + (x-1)] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(x-1)))+str(y-1).split('.')[0]))
                    if y < 6:
                        if board[(y+2) * 8 + (x-1)] == '.' or 'A' <= board[(y+2) * 8 + (x-1)] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(x-1)))+str(y+3).split('.')[0]))
                if x < 6:
                    if y > 0:
                        if board[(y-1) * 8 + (x+2)] == '.' or 'A' <= board[(y-1) * 8 + (x+2)] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(x+2)))+str(y).split('.')[0]))
                    if y < 7:
                        if board[(y+1) * 8 + (x+2)] == '.' or 'A' <= board[(y+1) * 8 + (x+2)] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(x+2)))+str(y+2).split('.')[0]))
                if x < 7:
                    if y > 1:
                        if board[(y-2) * 8 + (x+1)] == '.' or 'A' <= board[(y-2) * 8 + (x+1)] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(x+1)))+str(y-1).split('.')[0]))
                    if y < 6:
                        if board[(y+2) * 8 + (x+1)] == '.' or 'A' <= board[(y+2) * 8 + (x+1)] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(x+1)))+str(y+3).split('.')[0]))
            # Bishop
            if board[i] == 'b':
                tempX = x
                tempY = int(y)
                while tempX > 0 and tempY > 0:
                    tempX -= 1
                    tempY -= 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'A' <= board[tempY * 8 + tempX] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                tempY = int(y)
                while tempX > 0 and tempY < 7:
                    tempX -= 1
                    tempY += 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'A' <= board[tempY * 8 + tempX] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                tempY = int(y)
                while tempX < 7 and tempY > 0:
                    tempX += 1
                    tempY -= 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'A' <= board[tempY * 8 + tempX] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                tempY = int(y)
                while tempX < 7 and tempY < 7:
                    tempX += 1
                    tempY += 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'A' <= board[tempY * 8 + tempX] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
            # Queen
            if board[i] == 'q':
                tempX = x
                tempY = int(y)
                while tempX > 0:
                    tempX -= 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'A' <= board[tempY * 8 + tempX] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                while tempX < 7:
                    tempX += 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'A' <= board[tempY * 8 + tempX] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                while tempY > 0:
                    tempY -= 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'A' <= board[tempY * 8 + tempX] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempY = int(y)
                while tempY < 7:
                    tempY += 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'A' <= board[tempY * 8 + tempX] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                tempY = int(y)
                while tempX > 0 and tempY > 0:
                    tempX -= 1
                    tempY -= 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'A' <= board[tempY * 8 + tempX] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                tempY = int(y)
                while tempX > 0 and tempY < 7:
                    tempX -= 1
                    tempY += 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'A' <= board[tempY * 8 + tempX] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                tempY = int(y)
                while tempX < 7 and tempY > 0:
                    tempX += 1
                    tempY -= 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'A' <= board[tempY * 8 + tempX] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
                tempX = x
                tempY = int(y)
                while tempX < 7 and tempY < 7:
                    tempX += 1
                    tempY += 1
                    if board[tempY * 8 + tempX] == '.':
                        moves.append(
                            orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                    else:
                        if 'A' <= board[tempY * 8 + tempX] <= 'Z':
                            moves.append(
                                orig + (chr(ord('a')+(7-(tempX)))+str(tempY+1).split('.')[0]))
                        break
            # King
            if board[i] == 'k':
                if (board[(8*y)+x-1] == '.' or 'A' <= board[(8*y)+x-1] <= 'Z') and x > 0:
                    moves.append(
                        orig + (chr(ord('a')+(7-(x-1)))+str(y+1).split('.')[0]))
                if (board[(8*y)+x+1] == '.' or 'A' <= board[(8*y)+x+1] <= 'Z') and x < 7:
                    moves.append(
                        orig + (chr(ord('a')+(7-(x+1)))+str(y+1).split('.')[0]))
                if y > 0:
                    if (board[(8*(y-1))+x-1] == '.' or 'A' <= board[(8*(y-1))+x-1] <= 'Z') and x > 0:
                        moves.append(
                            orig + (chr(ord('a')+(7-(x-1)))+str(y).split('.')[0]))
                    if board[(8*(y-1))+x] == '.' or 'A' <= board[(8*(y-1))+x] <= 'Z':
                        moves.append(
                            orig + (chr(ord('a')+(7-(x)))+str(y).split('.')[0]))
                    if (board[(8*(y-1))+x+1] == '.' or 'A' <= board[(8*(y-1))+x+1] <= 'Z') and x < 7:
                        moves.append(
                            orig + (chr(ord('a')+(7-(x+1)))+str(y).split('.')[0]))
                if y < 7:
                    if (board[(8*(y+1))+x-1] == '.' or 'A' <= board[(8*(y+1))+x-1] <= 'Z') and x > 0:
                        moves.append(
                            orig + (chr(ord('a')+(7-(x-1)))+str(y+2).split('.')[0]))
                    if board[(8*(y+1))+x] == '.' or 'A' <= board[(8*(y+1))+x] <= 'Z':
                        moves.append(
                            orig + (chr(ord('a')+(7-(x)))+str(y+2).split('.')[0]))
                    if (board[(8*(y+1))+x+1] == '.' or 'A' <= board[(8*(y+1))+x+1] <= 'Z') and x < 7:
                        moves.append(
                            orig + (chr(ord('a')+(7-(x+1)))+str(y+2).split('.')[0]))

        board[i]
        i += 1
    # print(moves)
    return moves


def processMove(board, move):
    #print(move)
    origX = 7-(ord(move[0])-ord('a'))
    origY = int(move[1])-1

    destX = 7-(ord(move[2])-ord('a'))
    destY = int(move[3])-1
    newBoard = (board + '.')[:-1]
    newBoard = list(newBoard)
    #print(f'({origX},{origY}) - ({destX},{destY})')

    switched = newBoard[origY*8+origX]
    newBoard[origY*8+origX] = '.'
    newBoard[destY*8+destX] = switched

    newBoard = "".join(newBoard)

    return newBoard

def goThrough(level, currBoard, player):
    bestMove = ''
    bestMoveValue = 0

    moves = getPossibleMoves(currBoard.state,player)

    for x in moves:
        currBoard.addChild(processMove(currBoard.state,x), x)

def minimax(depth, currBoard, player, alpha, beta):
    if depth == 0:
        return [boardEval(currBoard.state),currBoard.move]

    #moveEval = [0,'']
    #print(f"{player} at {depth} with {currBoard}")

    currMoves = getPossibleMoves(currBoard.state, player)
    if player:
        bestMove = [9999,'']
        for x in currMoves:
            newBoard = processMove(currBoard.state, x)
            child = currBoard.addChild(newBoard, x)
            nextMove = minimax(depth-1, child, not player, alpha, beta)
            bestMove = [nextMove[0],x] if nextMove[0] < bestMove[0] else bestMove
            beta = bestMove[0] if bestMove[0] < beta else beta
            #bestMove[1] = x
            if beta <= alpha or bestMove[0] < -500:
                return bestMove
        return bestMove
    else:
        bestMove = [-9999, '']
        for x in currMoves:
            newBoard = processMove(currBoard.state, x)
            child = currBoard.addChild(newBoard, x)
            nextMove = minimax(depth-1, child, not player, alpha, beta)
            bestMove = [nextMove[0],x] if nextMove[0] > bestMove[0] else bestMove
            alpha = bestMove[0] if bestMove[0] > alpha else alpha
            #bestMove[1] = x
            if beta <= alpha or bestMove[0] > 500:
                return bestMove
        return bestMove


def mainSolver(level, board, player):
    print(f'Solving')
    level = int(level)
    player = int(player)
    boardArray = convertBoard(board)
    moves = getPossibleMoves(boardArray, player)
    currBoard = GameState(boardArray, '', None)

    #print(f'this is the boardArray {boardArray}')
    i = 7
    while i >= 0:
        j = 7
        while j >= 0:
            print(f'{boardArray[i*8+j]}', end='')
            j -= 1
            if j >= 0:
                print(f' | ', end='')
        print()
        i -= 1

    bestMove = minimax(int(level),currBoard,player, -99999, 99999)
    print(f'The best move is {bestMove}')

    boardArray = processMove(boardArray, bestMove[1])
    value = boardEval(boardArray)
    i = 7
    while i >= 0:
        j = 7
        while j >= 0:
            print(f'{boardArray[i*8+j]}', end='')
            j -= 1
            if j >= 0:
                print(f' | ', end='')
        print()
        i -= 1
    print(value)
    return bestMove[1]

#chessBoard = 'rw|kw|bw|Kw|qw|bw|kw|rw|pw|pw|pw|pw|pw|pw|pw|pw|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |pb|pb|pb|pb|pb|pb|pb|pb|rb|kb|bb|Kb|qb|bb|kb|rb|'

# mainSolver(1,chessBoard,1)
