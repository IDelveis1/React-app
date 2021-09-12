import { ResponseType } from '../../api/api';
import { UsersAPI } from './../../api/users-api';
import { follow } from "./user-reducer"
jest.mock('./../../api/users-api')


const result: ResponseType = {
    messages: [],
    data: {},
    resultCode: 0
}

const UsersApiMock = UsersAPI as jest.Mocked<typeof UsersAPI>

UsersApiMock.follow.mockReturnValue(Promise.resolve(result))


test('followThunk success', () => {

    const thunk = follow(1)
    const dispatchMock = jest.fn()
    //@ts-ignore
    thunk(dispatchMock)
    expect(dispatchMock).toBeCalledTimes(3)
})