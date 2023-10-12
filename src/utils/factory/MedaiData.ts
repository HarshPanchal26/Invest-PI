type TypeForMediaData = {
    id: number,
    img: string,
    title: string,
    subtitle: string,
    rows?: number,
    cols?: number,
    featured?: true,
}

export const ArrayForMediaData: TypeForMediaData[] = [
    {
        id : 0,
        img: 'https://wallpapers.com/images/featured/blank-black-30v1jc8gncezzrz9.jpg',
        title: 'Title1',
        subtitle: 'Sub Title1',
    },
    {
        id : 1,
        img: 'https://wallpapers.com/images/featured/blank-black-30v1jc8gncezzrz9.jpg',
        title: 'Title2',
        subtitle: 'Sub Title2',
    },
    {
        id : 2,
        img: 'https://wallpapers.com/images/featured/blank-black-30v1jc8gncezzrz9.jpg',
        title: 'Title3',
        subtitle: 'Sub Title3',
    },
    {
        id : 3,
        img: 'https://wallpapers.com/images/featured/blank-black-30v1jc8gncezzrz9.jpg',
        title: 'Title4',
        subtitle: 'Sub Title4',
    },
];



export const generateMediaData = (arrayForMedia: Array<TypeForMediaData>) : Array<TypeForMediaData> => {
    if (arrayForMedia.length === 0) {
        return ArrayForMediaData;
    } else {
        arrayForMedia.map((item: any, index) => {
            ArrayForMediaData[index].id = item.index;
            ArrayForMediaData[index].img = item.imageUrl;
            ArrayForMediaData[index].title = item.title;
            ArrayForMediaData[index].subtitle = item.subtitle;
        })
        return ArrayForMediaData;
    }
}