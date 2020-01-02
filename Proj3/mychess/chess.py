#import chess


class GameState:
    def __init__(self, board, movement):
        self.min = 99999
        self.max = -99999
        self.state = ''
        self.children = []
        self.move = movement

    def addChild(self, board, move):
        auxChild = GameState(board, move)
        self.children.append(auxChild)


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


def getPossibleMoves(board):
    moves = []
    i = 0
    while i < 8*8:
        x = i % 8
        y = int((i-(i % 8))/8)
        orig = chr(ord('a')+(7-x))+str(y+1).split('.')[0]
        print(orig + " - " + board[i])
        # White Pieces
        # Pawn
        if board[i] == 'P':
            if y == 1:
                if board[i + 16] == '.':
                    moves.append(
                        orig + (chr(ord('a')+(7-x))+str(y+3).split('.')[0]))
                if x > 0 and 'a' <= board[i+15] <= 'z':
                    moves.append(
                        orig + (chr(ord('a')+(7-(x-1)))+str(y+3).split('.')[0]))
                if x < 7 and 'a' <= board[i+17] <= 'z':
                    moves.append(
                        orig + (chr(ord('a')+(7-(x+1)))+str(y+3).split('.')[0]))
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

        # Black Pieces
        # Pawn
        if board[i] == 'p':
            if y == 6:
                if board[i - 16] == '.':
                    moves.append(
                        orig + (chr(ord('a')+(7-x))+str(y-1).split('.')[0]))
                if x > 0 and 'A' <= board[i-17] <= 'Z':
                    moves.append(
                        orig + (chr(ord('a')+(7-(x-1)))+str(y-1).split('.')[0]))
                if x < 7 and 'A' <= board[i-15] <= 'Z':
                    moves.append(
                        orig + (chr(ord('a')+(7-(x+1)))+str(y-1).split('.')[0]))
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
    print(moves)


def mainSolver(level, board, player):
    print(f'Solving')
    boardArray = convertBoard(board)
    getPossibleMoves(boardArray)
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
    return boardArray

#chessBoard = 'rw|kw|bw|Kw|qw|bw|kw|rw|pw|pw|pw|pw|pw|pw|pw|pw|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |pb|pb|pb|pb|pb|pb|pb|pb|rb|kb|bb|Kb|qb|bb|kb|rb|'

# mainSolver(1,chessBoard,1)
