import useMediaQuery from '@mui/material/useMediaQuery';
export default function ResponseComponent(props) {
    const { render, maxWidth, minWidth } = props
    const matcheMaxWidth = useMediaQuery(`(max-width:${maxWidth}px)`);
    const matcheMinWidth = useMediaQuery(`(min-width:${minWidth}px)`);
    if (maxWidth && matcheMaxWidth) {
        return render(props)
    }
    else if (minWidth && matcheMinWidth) {
        return render(props)
    }
    else {
        return null
    }

}