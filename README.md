# dummy-counter

A simple React component that allows for inputing code recieved via SMS or OTP in standard, multiple textbox way.

## How to use

`npm install simple-react-otp-input`

You can now import `OtpInput` from `simple-react-otp-input` like so:

```
import OtpInput from 'simple-react-otp-input'

const [code, setCode] = useState('')

const handleCodeChange = (newCode: string) => {
        setCode(newCode)
    }

<OtpInput
                noOfInputs={4}
                numbersOnly
                hiddenInput
                onChange={handleCodeChange}
                value={code}
                customInputClass="bg-yellow-500 rounded-full h-10 w-10 text-white text-center"
/>
...
```

## Available props

```

noOfInputs: number
value: string
onChange: (newCode: string) => void

numbersOnly: boolean (optional)
hiddenInput: boolean (optional)
customInputClass: string (optional)
customContainerClass: string (optional)

```

How to use inside other components

To customise this component, pass in a class name to the `customInputClass` or `customContainerClass` prop and style that class name in your custom CSS.
Otherwise the component will have a default style.

### Default styles

```
*{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

.code-container{
    display: flex;
    gap: 16px;
}

.default-input-style {
    height: 40px;
    width: 40px;
    border: 2px solid black;
    text-align: center;
    color: black;
}
```

```

// your-component.js
import OtpInput from 'simple-react-otp-input'

...
<OtpInput customInputClass="bg-yellow-500 rounded-full  h-10 w-10 text-white text-center"
customContainerClass="grid grid-cols-2"
 />
...

```

**Example with Tailwindcss but you can use any other way of styling with classes.**
