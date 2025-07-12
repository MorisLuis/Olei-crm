import styles from '../../styles/pages/Calendar.module.scss';

const TimelineSkeleton = (): JSX.Element => {
    return (
        <div className={styles.timelineContent} style={{ width: "100%"}}>
            {/* TIMELINE */}
            <p className="utils__marginBottom" ></p>
            <p className="skeleton skeleton--h2 utils__marginBottom utils__half--width"></p>
            <section className="custom-timeline skeleton" style={{ height: "100vh" }}>
            </section>
        </div>
    );
};

export default TimelineSkeleton;
