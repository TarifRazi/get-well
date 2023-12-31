

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto md:w-3/12 m-8">
            <p className="text-blue-600 text-center text-2xl font-medium">--- {subHeading} ---</p>
            <h2 className="text-4xl text-red-600 text-center font-extrabold uppercase border-y-4 py-4">{heading}</h2>
        </div>
    );
};

export default SectionTitle;